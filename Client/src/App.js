import React, { Component } from "react";
import { Switch, Route, Router, Link } from "react-router-dom";
import "./App.scss";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import ChatComponent from "./components/chat-component"
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import EventBus from "./common-utils/EventBus";

import { logout } from "./actions/auth-action";
import { clearMessage } from "./actions/message-action";
import { connect } from "react-redux";

import { history } from './common-utils/history';
import { clearError } from "./actions/error-action";
import { clearData } from "./actions/api-action";


const Page404 = () => <h1>Four:oh:four</h1>

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showChatRoom: false,
      currentUser: undefined,
    };

    
    history.listen((location) => {
      console.log(history.location)
      console.log(location)
      console.log(window.location.pathname.toString())
      if (window.location.pathname.toString() !== location.pathname) {
        props.dispatch(clearMessage()); // clear message when changing location
        props.dispatch(clearError()); // clear error when changing location
        props.dispatch(clearData()); // clear api data when changing location
      }
    });
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showChatRoom: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { user, navigation } = this.props;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-primary">
            <Link to={"/"} className="navbar-brand">
              About
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {navigation && navigation.showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Member
                  </Link>
                </li>
              )}
              {navigation && navigation.showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin 
                  </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
              {navigation && navigation.showChatRoom && (
                <li className="nav-item">
                  <Link to={"/chat-room"} className="nav-link">
                    Live Chat
                  </Link>
                </li>
              )}
            </div>
            {user ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    <div className="text-truncate" style={{ maxWidth: 10 + 'em' }}>{user.username}</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" onClick={this.logOut}>
                    LogOut
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/chat-room" component={ChatComponent} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route component={Page404} />
            </Switch>
          </div>

          { /*<AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  const { user, navigation } = state.auth;
  return {
    user,
    navigation
  };
}

export default connect(mapStateToProps)(App);