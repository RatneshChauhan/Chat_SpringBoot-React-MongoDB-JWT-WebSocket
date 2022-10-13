import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserBoard } from "../actions/api-action";


class BoardUser extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, history } = this.props;
    dispatch(getUserBoard())
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron bg-dark text-white">
          <h3>{this.props.data}</h3>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { data } = state.data;
  return {
    data,
  };
}

export default connect(mapStateToProps)(BoardUser);