import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearCart } from "../../redux/actions";
import successIcon from "../../assets/images/check.svg";
const Checkout = (props) => {
  useEffect(() => {
    if (props.app.cartItems.length === 0 && !success) {
      props.history.push("/app/home");
    }

    if (props.app.cartItems.length === 0 && success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);

      clearInterval();
    }
  }, []);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExipy, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const onPay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      awaitSuccess();
    }, 2000);

    clearInterval();
  };
  const awaitSuccess = () => {
    setTimeout(() => {
      props.clearCart();
      props.history.push("/app/home");
    }, 2000);
    clearInterval();
  };
  return (
    <div className="container home">
      {props.app.cartItems.length > 0 && (
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col-lg-5 col-12 d-flex flex-column justify-content-center align-items-center">
            {!success && !loading ? (
              <div className="payment-bloc container-fluid  d-flex flex-column justify-content-center align-items-center">
                <h3>Payment informations</h3>
                <div className="card-info">
                  <h5>Card hlder name</h5>
                  <input
                    placeholder="Ismail kherbach"
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                <div className="card-info">
                  <h5>Card number </h5>
                  <input
                    placeholder="4242 4242 4242 4242"
                    maxLength={16}
                    type="number"
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>

                <div className="row container-fluid">
                  <div className="card-info small">
                    <h5>Expiry Date </h5>
                    <input
                      placeholder="05/21"
                      maxLength={5}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="card-info small">
                    <h5>CVC </h5>
                    <input
                      placeholder="244"
                      type="number"
                      maxLength={3}
                      onChange={(e) => setCardCVC(e.target.value)}
                    />
                  </div>
                </div>
                <h2>Total : AED {props.app.total}</h2>

                {cardName.length >= 4 &&
                cardNumber.length === 16 &&
                cardExipy.length >= 4 &&
                cardCVC.length === 3 ? (
                  <button onClick={onPay}>Checkout</button>
                ) : (
                  <button className="disabled">Checkout</button>
                )}
              </div>
            ) : (
              <div className="payment-bloc container-fluid  d-flex flex-column justify-content-center align-items-center">
                {loading && !success && <div className="loading"></div>}
                {success && !loading && (
                  <div className="success container-fluid d-flex flex-column justify-content-center align-items-center">
                    <img alt="success" src={successIcon} />
                    <h5>Payment Successfull</h5>
                    <button onClick={() => props.history.push("/app/home")}>
                      Click here to shop again
                    </button>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ app }) => {
  return { app };
};
export default connect(mapStateToProps, { clearCart })(Checkout);
