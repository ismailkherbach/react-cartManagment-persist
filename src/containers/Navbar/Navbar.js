import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
function Navbar(props) {
  return (
    <nav className="navbar nav-wrapper navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link to="/" className="brand-logo">
          Phoenix
        </Link>
        <ul className="right row align-items-center">
          <li>
            <Link to="/">Products</Link>
          </li>

          <li className="col">
            <Link to="/app/cart">
              <i className="material-icons">shopping_cart</i>
              <div className="cart_number d-flex flex-column justify-content-center align-items-center">
                {props.app.cartItems.length}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ app }) => {
  return { app };
};
export default connect(mapStateToProps, {})(Navbar);
