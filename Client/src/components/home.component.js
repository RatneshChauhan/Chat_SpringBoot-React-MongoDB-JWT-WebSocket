import React, { Component } from "react";
import { connect } from "react-redux";
import { getPublicContent } from "../actions/api-action";

class Home extends Component {
  constructor(props) {
    super(props);
    const { dispatch, history } = this.props;
    dispatch(getPublicContent())
  }

  componentDidMount() {
  }
  render() {
    const {data } = this.props
    if (Array.isArray(data)) {
      const displayData = data.map((el, index) => {
        return <div key={index} >
          <h3>{el.title}</h3>
          <p> {el.description}</p>
        </div>
      });
      return <div className="container">
        <div className="jumbotron bg-dark text-white">{displayData}</div>
      </div>;
    }

  }
}
function mapStateToProps(state) {
  console.log(state)
  const { data } = state.data;
  return {
    data,
  };
}

export default connect(mapStateToProps)(Home);