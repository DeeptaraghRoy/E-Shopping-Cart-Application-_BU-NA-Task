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
import Modal from "react-bootstrap/Modal";
import AdminAddProductAxios from "./AdminAddProductAxios";

function AdminEdit() {
  const [data, setdata] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let d;
  useEffect(() => {
    GetAllProducts.getAllProducts().then((value) => {
      setdata(value);
      d = value;
      console.log("d ", d);
      console.log("token :", sessionStorage.getItem("token"));
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
          {/* <Card.Text>{item.description}</Card.Text> */}

          <NavLink
            to={"/AdminEdit/ProductDetails/" + item.productId}
            className="btn btn-outline-primary ms-2 fa fa-pencil"
          >
            {"    "}
            Edit Product
          </NavLink>
        </Card.Body>
      </Card>
    );
  };

  const funcSearch = (event) => {
    event.preventDefault();
    let name = document.getElementById("Search").value;
    window.open(
      "http://localhost:3000/AdminProductEdit/Search/" + name,
      "_self"
    );
  };

  const addProducts = (event) => {
    console.log("Add Products");
    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ADD PRODUCT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicproductName1">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter Product Name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCategory1">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPrice1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  placeholder="Enter Price"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDescription1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="Enter Description"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicStockQuantity1">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Stock Quantity"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicProductImg1">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Image URL"
                  required
                />
              </Form.Group>

              <Button
                variant="outline-primary w-100 mt-5"
                type="submit"
                onClick={addProductsAxios}
                className="fa fa-share"
              >
                {"    "}
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  };

  const addProductsAxios = (event) => {
    event.preventDefault();
    console.log("Add Product Axios");
    let productName = document
      .getElementById("formBasicproductName1")
      .value.trim();
    let category = document.getElementById("formBasicCategory1").value;
    let price = document.getElementById("formBasicPrice1").value;
    let description = document.getElementById("formBasicDescription1").value;
    let StockQuantity = document.getElementById(
      "formBasicStockQuantity1"
    ).value;
    let ProductImage = document.getElementById("formBasicProductImg1").value;
    let body = {
      productName: productName,
      category: category,
      price: price,
      description: description,
      stockQuantity: StockQuantity,
      productImg: ProductImage,
    };
    console.log(body);
    AdminAddProductAxios.AdminAddProductAxios(body).then((value) => {
      handleClose();
      window.open("http://localhost:3000/AdminEdit", "_self");
    });
  };

  return (
    <div>
      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <h1>Admin Product Details</h1>
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
              <Dropdown.Item href={"/AdminProductEdit/Cat/" + "fashion"}>
                Fashion
              </Dropdown.Item>
              <Dropdown.Item
                href={"/AdminProductEdit/Cat/" + "mobiles and tablets"}
              >
                Mobiles and Tablets
              </Dropdown.Item>
              <Dropdown.Item
                href={"/AdminProductEdit/Cat/" + "consumer electronics"}
              >
                Consumer Electronics
              </Dropdown.Item>
              <Dropdown.Item href={"/AdminProductEdit/Cat/" + "books"}>
                Books
              </Dropdown.Item>
              <Dropdown.Item href={"/AdminProductEdit/Cat/" + "baby products"}>
                Baby Products
              </Dropdown.Item>
              <Dropdown.Item
                href={"/AdminProductEdit/Cat/" + "home furnishings"}
              >
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
                className="ms-4 fa fa-search"
                variant="outline-primary"
                type="submit"
                style={{ height: "2.5rem" }}
              >
                Search
              </Button>
              <Button
                className="ms-3 fa fa-plus-circle"
                variant="outline-primary"
                onClick={handleShow}
                style={{ height: "2.5rem" }}
              >
                {"    "}
                Add Products
              </Button>
              {show == true && addProducts()}
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

export default AdminEdit;
