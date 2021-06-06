import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts, addToCart } from "../../redux/actions";
const Home = (props) => {
  const [dataNumber, setDataNumber] = useState("20");
  const offset = "0";
  useEffect(() => {
    let number = dataNumber;
    let data = { number, offset };
    props.getProducts(data);
  }, []);

  const getProductss = () => {
    let number = (parseInt(dataNumber) + 20).toString();
    setDataNumber(number);
    let data = { number, offset };
    props.getProducts(data);
  };

  const addProductToCart = (product) => {
    props.addToCart(product);
  };
  return (
    <div className="container-fluid home">
      {props.app.products.length > 0 ? (
        <div className="row d-flex flex-row justify-content-center align-items-center">
          {props.app.products.map((e, i) => {
            return (
              <div
                key={i}
                className="col-sm-12 col-md-6 col-xl-3 col-12 d-flex flex-column justify-content-center align-items-center"
              >
                <div className="product container-fluid  d-flex flex-column justify-content-center align-items-center">
                  <div className="image-mask d-flex flex-column justify-content-center align-items-center">
                    <img alt={e.title} src={e.image} />
                  </div>
                  <h5>{e.title}</h5>
                  <div className="col ">
                    <div className="row call-action justify-content-center align-items-center">
                      <p>AED 10.00</p>
                      <button
                        onClick={() => addProductToCart(e)}
                        className="right"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            className="load-more row d-flex flex-row justify-content-center align-items-center"
            onClick={getProductss}
          >
            {props.app.loading ? (
              <div className="loading-main-button"></div>
            ) : (
              "Load more"
            )}
          </button>
        </div>
      ) : (
        <div className="loading-overlay row d-flex flex-row justify-content-center align-items-center">
          <div className="loading-main-button"></div>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({ app }) => {
  return { app };
};
export default connect(mapStateToProps, { getProducts, addToCart })(Home);
