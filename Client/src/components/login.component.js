import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SocketService from "../services/socket.service";

import { connect } from "react-redux";
import { login } from "../actions/auth-action";

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      successful: false
    };
  }

  componentDidMount() {
    localStorage.removeItem("user");
    SocketService.connect()
  }

  onChangeUsername(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();


    const { dispatch, history } = this.props;
    dispatch(login(this.state.email, this.state.password))
      .then(() => {
        this.setState({
          loading: false,
          successful: true
        });
        history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        this.setState({
          loading: false,
          successful: false
        });
      });
  }

  render() {
    const { email, password } = this.state;
    const { message, error } = this.props;
    console.log(this.props)
    console.log(message, error)
    return (
      <Form  onSubmit={this.handleLogin} className="login-form form-margin w-50">
        {error && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        )}
        <FormGroup>
          <Input  type="email" placeholder="email" value={email} onChange={(e) => { this.onChangeUsername(e) }} />
        </FormGroup>
        <FormGroup>
          <Input type="password" placeholder="password" value={password} onChange={(e) => { this.onChangePassword(e) }} />
        </FormGroup>
        <Button className="btn btn-lg btn-primary btn-block ">Login</Button>
        <FormGroup>
          <div className="text-center">Or continue with your social account.</div>
          <div className="text-center">
            <a href="/register">Sign up</a>
            <span className="p-2">|</span>
            <a href="/forgot-password">Forgot password</a>
          </div>
        </FormGroup>
      </Form>
    );
  }
}


function mapStateToProps(state) {
  console.log(state)
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  const { error } = state.error;
  return {
    isLoggedIn,
    message,
    error
  };
}

export default connect(mapStateToProps)(Login);