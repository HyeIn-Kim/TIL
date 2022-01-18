import DisplayNumber from "../components/DisplayNumber";
import { connect } from "react-redux";

// Redux의 State를 React의 Props로 Mapping
function mapStateToProps(state) {
  return {
    number: state.number,
  };
}

// Redux의 Dispatch를 React의 Props로 Mapping
// function mapDispatchToProps() {
//   return {};
// }

// connect를 쓰면 아래와 같이 작동해!
export default connect(mapStateToProps)(DisplayNumber);

// import React, { Component } from "react";
// import store from "../store";
// export default class extends Component {
//   state = { number: store.getState().number };
//   constructor(props) {
//     super(props);
//     store.subscribe(
//       function () {
//         this.setState({ number: store.getState().number });
//       }.bind(this)
//     );
//   }
//   render() {
//     return <DisplayNumber unit="kg" number={this.state.number} />;
//   }
// }
