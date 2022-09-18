import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { allItem, delItem, addItem } from "../redux/actions/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CloseButton from "react-bootstrap/CloseButton";
import { NavLink } from "react-router-dom";
import UpdateItemQtyAxios from "./UpdateItemQtyAxios";
import GetAllItemsAxios from "./GetAllItemsAxios";
import DeleteItemsAxios from "./DeleteItemsAxios";
import AddCartAxios from "./AddCartAxios";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Cart = () => {
  const state1 = useSelector((state1) => state1.allItem);
  const state = useSelector((state) => state.addItem);
  const dispatch = useDispatch();
  useEffect(() => {
    GetAllItemsAxios.GetAllItemsAxios().then((value) => {
      console.log("cart1 ", value);
      if (!(value.length == 1 && value[0] === "AUTHORIZATION FAILED")) {
        //if(state1.length<1)
        //{
        dispatch(allItem(value));
        //}
      }
    });
  }, [state]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Delete item
    </Tooltip>
  );

  const handleClose = (item) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      DeleteItemsAxios.deleteItemsAxios(
        "http://localhost:8084/cart-service/cart/updateCart/deleteItem/" +
          item.productName
      ).then((value) => {
        dispatch(delItem(item));
        //window.open("http://localhost:3000/cart","_self")
        dispatch(allItem(value));
      });
    }
  };

  const cartItems = (cartItem) => {
    const changeQty = (event) => {
      event.preventDefault();
      let qan = document.getElementById(
        "qtyChange" + cartItem.productName
      ).value;
      console.log("new quantity", qan);
      UpdateItemQtyAxios.updateItemQtyAxios(
        "http://localhost:8084/cart-service/cart/updateCart/itemQuantity/" +
          cartItem.productName +
          "/" +
          qan
      ).then((value) => {
        //window.open("http://localhost:3000/cart","_self")
        //const state1 = useSelector((state1) => state1.allItem);
        alert("ITEM QUANTITY UPDATED SUCCESSFULLY");
        GetAllItemsAxios.GetAllItemsAxios().then((value1) => {
          dispatch(allItem(value1));
        });
      });
    };

    return (
      <div className="px-4 bg-light rounded-3" key={cartItem.productId}>
        <Container className="py-4">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <CloseButton
              onClick={() => handleClose(cartItem)}
              className="float-end"
            />
          </OverlayTrigger>
          <Row className="justify-content-center">
            <Col>
              <img
                src={cartItem.productImg}
                alt={cartItem.productName}
                height="200px"
                width="180px"
              />
            </Col>
            <Col>
              <h3>{cartItem.productName}</h3>
              <p className="lead fw-bolder">₹{cartItem.price}</p>
              <p className="lead fw-bolder">
                QUNATITY :{"  "}
                {cartItem.quantity}
              </p>
              <form onSubmit={changeQty} className="card p-2">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    id={"qtyChange" + cartItem.productName}
                    defaultValue={cartItem.quantity}
                  />
                  <button type="submit" className="btn btn-secondary">
                    Change Quantity
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3">
        <Container className="py-4">
          <Row>
            <h3>Your Cart is Empty</h3>
          </Row>
        </Container>
      </div>
    );
  };

  const cartAdd = () => {
    AddCartAxios.AddCartAxios(
      "http://localhost:8084/cart-service/cart/addcart"
    ).then((value) => {
      console.log("Add to cart resp ", value);
    });
  };

  const button = () => {
    return (
      <Container>
        <Row>
          <NavLink
            to="/checkout"
            className="btn btn-outline-primary mb-5 w-25 mx-auto fa fa-shopping-cart"
            onClick={cartAdd}
          >
            {"    "}
            Proceed To Checkout
          </NavLink>
        </Row>
      </Container>
    );
  };

  return (
    <>
      {state1.length === 0 && emptyCart()}
      {state1.length !== 0 &&
        state1[state1.length - 1].length === 0 &&
        emptyCart()}
      {state1.length !== 0 && state1[state1.length - 1].map(cartItems)}
      {state1.length !== 0 &&
        state1[state1.length - 1].length !== 0 &&
        button()}
    </>
  );
};

export default Cart;
