import React, { useState, useEffect } from "react";
import GetAllProducts from "../components/GetAllProducts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addItem, delItem, allItem } from "../redux/actions/index";
import Form from "react-bootstrap/Form";

import AddItemsAxios from "./AddItemsAxios";
import DeleteItemsAxios from "./DeleteItemsAxios";

function ProductDetail() {
  const [data, setdata] = useState([]);
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  const [qty, setqty] = useState(0);
  let d;

  // We need to store useDispatch in a variable
  const dispatch = useDispatch();

  useEffect(() => {
    GetAllProducts.getAllProducts().then((value) => {
      setdata(value);
      d = value;
      console.log("dygwewfiuhhfoiqhofioehfoiehfiwe ", value);
    });
  }, []);
  const proid = useParams();
  console.log("proid: ", proid.id);
  console.log("data: ", data);
  const proDetail = data.filter((x) => x.productId == proid.id);
  console.log("productDetail: ", proDetail);
  const product = proDetail[0];
  console.log(product);

  const func = () => {
    const handleCart = (product) => {
      let result;
      if (sessionStorage.getItem("token") !== "") {
        if (cartBtn === "Add to Cart") {
          AddItemsAxios.addItemsAxios(
            "http://localhost:8084/cart-service/cart/items/" +
              product.productName +
              "/" +
              qty
          ).then((value) => {
            result = value[0];
            console.log("result ", result);
            console.log("product ", product);
            dispatch(addItem(result));
            setCartBtn("Remove from Cart");
          });
        } else {
          DeleteItemsAxios.deleteItemsAxios(
            "http://localhost:8084/cart-service/cart/updateCart/deleteItem/" +
              product.productName
          );

          dispatch(delItem(product));
          setCartBtn("Add to Cart");
        }
      } else {
        alert("PLEASE LOGIN/SIGNUP TO ADD ITEMS TO CART");
      }
    };

    const funcSearch = (event) => {
      event.preventDefault();
      setqty(document.getElementById("Quantity").value);
      console.log(qty);
    };

    return (
      <div>
        <Container className="my-5 py-3">
          {
            <Row>
              <Col className="d-flex justify-content-center mx-auto product">
                <img
                  src={product.productImg}
                  alt={product.productName}
                  height="600px"
                />
              </Col>
              <Col className="d-flex flex-column justify-content-center">
                <h1 className="display-5 fw-bolder">{product.productName}</h1>
                <hr />
                <h2 className="my-4">₹{product.price}</h2>
                <p className="lead">{product.description}</p>
                {product.stockQuantity <= 0 && (
                  <div>
                    <h2 className="f-bolder" style={{ color: "red" }}>
                      SORRY OUT OF STOCK !
                    </h2>
                    <p className="f-bolder" style={{ color: "green" }}>
                      Pre book this item to get it as soon as it is back in
                      stock .
                    </p>
                  </div>
                )}
                <Container>
                  <Row className="d-flex">
                    <Col className="text-left d-flex">
                      {product.stockQuantity > 0 && (
                        <Form className="d-flex ms-5">
                          <Form.Group
                            className="d-flex ms-5"
                            controlId="Quantity"
                          >
                            <Form.Label
                              className="d-flex fw-bolder"
                              style={{ fontSize: "35px" }}
                            >
                              QUANTITY :
                            </Form.Label>
                            <Form.Control
                              className="ms-5"
                              type="number"
                              placeholder="Quantity"
                              style={{ width: "10rem" }}
                              onChange={funcSearch}
                            />
                          </Form.Group>
                        </Form>
                      )}
                    </Col>
                  </Row>
                </Container>

                <Button
                  onClick={() => handleCart(product)}
                  variant="outline-primary my-5"
                  className="fa fa-cart-plus"
                >
                  {"    "}
                  {cartBtn}
                </Button>
              </Col>
            </Row>
          }
        </Container>
      </div>
    );
  };

  return React.Children.toArray(data.map(func)[0]);
}
export default ProductDetail;
