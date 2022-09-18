import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card";
import GetAllProducts from "../components/GetAllProducts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
// import { allProduct} from "../redux/actions/index";

function Product() {
  const [data, setdata] = useState([]);
  let d;
  const dispatch = useDispatch();
  useEffect(() => {
    GetAllProducts.getAllProducts().then((value) => {
      setdata(value);
      d = value;
      console.log("d ", d);
      console.log("token :", sessionStorage.getItem("token"));
      // dispatch(allProduct(value));
    });
  }, []);

  const cardItem = (item) => {
    return (
      <Card className="my-5 py-4" style={{ width: "32rem" }}>
        <div>
          <Card.Img
            src={item.productImg}
            variant="top"
            style={{ width: "30rem", height: "32rem" }}
            className="justify-content-center"
          />
        </div>
        <Card.Body className="text-center my-5">
          <Card.Title>{item.productName}</Card.Title>
          <Card.Text>{item.category}</Card.Text>
          <Card.Text>₹{item.price}</Card.Text>
          {item.stockQuantity <= 0 && (
            <h4 className="f-bolder" style={{ color: "red" }}>
              SORRY OUT OF STOCK !
            </h4>
          )}

          {item.stockQuantity > 0 && (
            <NavLink
              to={"/product/" + item.productId}
              className="btn btn-outline-primary ms-2 fa fa-shopping-cart"
            >
              {"    "}
              Buy Now
            </NavLink>
          )}
          {item.stockQuantity <= 0 && (
            <NavLink
              to={"/product/" + item.productId}
              className="btn btn-outline-primary ms-2 fa fa-shopping-cart"
            >
              {"    "}
              Pre Book This Item
            </NavLink>
          )}
        </Card.Body>
      </Card>
    );
  };

  const funcSearch = (event) => {
    event.preventDefault();
    let name = document.getElementById("Search").value;
    window.open("http://localhost:3000/product/Search/" + name, "_self");
  };

  return (
    <div>
      <Container className="py-3">
        <Row>
          <Col className="text-center">
            <h1>Product</h1>
            <hr />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="d-flex">
          <Col className="text-left d-flex">
            <DropdownButton
              variant="outline-primary"
              id="dropdown-basic-button"
              title="Select Category"
            >
              <Dropdown.Item href={"/product/Cat/" + "fashion"}>
                Fashion
              </Dropdown.Item>
              <Dropdown.Item href={"/product/Cat/" + "mobiles and tablets"}>
                Mobiles and Tablets
              </Dropdown.Item>
              <Dropdown.Item href={"/product/Cat/" + "consumer electronics"}>
                Consumer Electronics
              </Dropdown.Item>
              <Dropdown.Item href={"/product/Cat/" + "books"}>
                Books
              </Dropdown.Item>
              <Dropdown.Item href={"/product/Cat/" + "baby products"}>
                Baby Products
              </Dropdown.Item>
              <Dropdown.Item href={"/product/Cat/" + "home furnishings"}>
                Home Furnishings
              </Dropdown.Item>
            </DropdownButton>

            <Form onSubmit={funcSearch} className="d-flex ms-5">
              <Form.Group className="mb-3" controlId="Search">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  style={{
                    width: "50rem",
                    borderRadius: "25px",
                    border: "2px solid #73AD21",
                  }}
                />
              </Form.Group>
              <Button
                className="ms-5 fa fa-search"
                variant="outline-primary"
                type="submit"
                style={{ height: "2.5rem" }}
              >
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container id="products_all">
        <Row className="justify-content-around">
          {/* using React.childer to Arrya to set key automatically for the items of list */}
          {React.Children.toArray(data.map(cardItem))}
        </Row>
      </Container>
    </div>
  );
}

export default Product;
