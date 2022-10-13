import React, { Component } from "react";
import { connect } from "react-redux";
import { getModBoard } from "../actions/api-action";

 class BoardModerator extends Component {
  constructor(props) {
    super(props);
}

  componentDidMount() {
    const { dispatch, history } = this.props;
    dispatch(getModBoard())
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
export default connect(mapStateToProps)(BoardModerator);