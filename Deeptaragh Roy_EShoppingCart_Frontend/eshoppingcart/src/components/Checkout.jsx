import React from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import PlaceOrderAxios from "./PlaceOrderAxios";
import PayAxios from "./PayAxios";

const Checkout = () => {
  const state = useSelector((state) => state.allItem[state.allItem.length - 1]);
  let total = 0.0;
  console.log("State 111111 :", state);
  const itemList = (item) => {
    total = total + item.price * item.quantity;
    return (
      <li
        className="list-group-item d-flex justify-content-between my-2"
        key={item.productId}
      >
        <div>
          <h6 className="my-0">{item.productName}</h6>
        </div>
        <span className="text-muted ms-3">₹{item.price}</span>
        <span className="text-muted ms-3">
          {"  "}X{item.quantity}
        </span>
      </li>
    );
  };

  const PlaceOrderPay = (event) => {
    event.preventDefault();

    let mode = "PAYPAL";

    PlaceOrderAxios.PlaceOrderAxios(
      "http://localhost:8084/order-service/Order/PlaceOrder/" + mode
    ).then((value) => {
      console.log("ORDER PLACED : ", value);
      PayAxios.PayAxios(
        "http://localhost:8084/payment-gateway-service/Payment/pay"
      ).then((res) => {
        console.log("oooooooooooooo", res);

        window.open(res);
      });
    });
  };

  return (
    <>
      <Container className="my-5 ">
        <div className="row g-5 justify-content-center my-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {state.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {state.map(itemList)}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>₹{total}</strong>
              </li>
            </ul>
            <div className="col-md-7 col-lg-8">
              <form
                onSubmit={PlaceOrderPay}
                className="needs-validation"
                noValidate
              >
                <hr className="my-4" />
                <button
                  className="w-100 btn btn-primary btn-lg fa fa-paypal"
                  type="submit"
                >
                  Continue to checkout
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-5 col-lg-4 order-md-last">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4813/4813095.png"
              alt=""
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
