import React from "react";
import { connect } from "react-redux";
import {
  addQuantity,
  subQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/actions";
import deleteProduct from "../../assets/images/trash.svg";
import emptyCart from "../../assets/images/empty-cart.png";
const Cart = (props) => {
  return (
    <div className="container home">
      <div className="row d-flex flex-row justify-content-center align-items-center">
        {props.app.cartItems.map((e, i) => {
          return (
            <div
              key={i}
              className="col-sm-12 col-md-6 col-xl-4 col-12 d-flex flex-column justify-content-center align-items-center"
            >
              <div className="product container-fluid  d-flex flex-column justify-content-center align-items-center">
                <div
                  onClick={() => props.removeFromCart(e)}
                  className="remove-product d-flex justify-content-end"
                >
                  <img alt={e.title} src={deleteProduct} />
                </div>
                <div className="image-mask d-flex flex-column justify-content-center align-items-center">
                  <img alt={e.title} src={e.image} />
                </div>
                <h5>{e.title}</h5>
                <div className="col ">
                  <div className="row call-action justify-content-center align-items-center">
                    <p>10.00 $</p>
                    <button
                      onClick={() => props.subQuantity(e)}
                      className="quantity-modify"
                    >
                      -
                    </button>
                    <h4 className="d-flex quantity justify-content-center align-items-center">
                      {e.quantity}
                    </h4>
                    <button
                      onClick={() => props.addQuantity(e)}
                      className="quantity-modify"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {props.app.cartItems.length > 0 && (
        <div className="container total-bloc row d-flex flex-column justify-content-center align-items-start">
          <div className="col-12">
            <h2>Total : AED {props.app.total}</h2>
            <button onClick={() => props.history.push("/app/checkout")}>
              Checkout
            </button>
          </div>
          <div className="col-2">
            <button className="clear-cart" onClick={() => props.clearCart()}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
      {props.app.cartItems.length === 0 && (
        <div className="row d-flex flex-row justify-content-center align-items-center">
          <img alt="empty-cart" src={emptyCart} />
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({ app }) => {
  return { app };
};
export default connect(mapStateToProps, {
  addQuantity,
  subQuantity,
  removeFromCart,
  clearCart,
})(Cart);
