import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar from "../containers/Navbar/Navbar";

class AppLayout extends Component {
  render() {
    return (
      <div id="app-container" className="flex fdc">
        <Navbar />
        <main>
          <div className="container flex">{this.props.children}</div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ settings }) => {
  return { settings };
};

export default withRouter(connect()(AppLayout));
