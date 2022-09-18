import React, { useState, useEffect } from "react";
import GetAllProducts from "../components/GetAllProducts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";

function ProductByCategory() {
  const [data, setdata] = useState([]);
  let d;
  useEffect(() => {
    GetAllProducts.getAllProducts().then((value) => {
      setdata(value);
      d = value;
      console.log("dygwewfiuhhfoiqhofioehfoiehfiwe ", value);
    });
  }, []);
  const proCat = useParams().cat.replace("%", " ");

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
          {/* <Card.Text>{item.description}</Card.Text> */}

          <NavLink
            to={"/product/" + item.productId}
            className="btn btn-outline-primary ms-2 fa fa-shopping-cart"
          >
            {"    "}
            Buy Now
          </NavLink>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <h1>{proCat.toUpperCase()}</h1>
            <hr />
          </Col>
        </Row>
      </Container>
      <Container id="products_all">
        <Row className="justify-content-around">
          {/* using React.childer to Arrya to set key automatically for the items of list */}
          {React.Children.toArray(
            data.filter((x) => x.category == proCat).map(cardItem)
          )}
        </Row>
      </Container>
    </div>
  );
}
export default ProductByCategory;
