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
import AdminEditProductDetailsAxios from "./AdminEditProductDetailsAxios";
import AdminDeleteProductAxios from "./AdminDeleteProductAxios";

function AdminEditProductDetails() {
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
    const EditDetails = (event) => {
      event.preventDefault();
      console.log("Add Product Axios");
      let productName = document.getElementById("formBasicproductName1").value;
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
      AdminEditProductDetailsAxios.AdminEditProductDetailsAxios(
        body,
        product.productId
      ).then((value) => {
        window.open("http://localhost:3000/AdminEdit", "_self");
      });
    };

    const DeleteProduct = (event) => {
      event.preventDefault();
      if (
        window.confirm("Are you sure about deleting this Product Listing ?")
      ) {
        AdminDeleteProductAxios.AdminDeleteProductAxios(product.productId).then(
          (value) => {
            window.open("http://localhost:3000/AdminEdit", "_self");
          }
        );
      }
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
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicproductName1"
                  >
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Enter Product Name"
                      defaultValue={product.productName}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCategory1">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Category"
                      defaultValue={product.category}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPrice1">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      step="any"
                      placeholder="Enter Price"
                      defaultValue={product.price}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicDescription1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      placeholder="Enter Description"
                      defaultValue={product.description}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicStockQuantity1"
                  >
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Stock Quantity"
                      defaultValue={product.stockQuantity}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicProductImg1">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Image URL"
                      defaultValue={product.productImg}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="outline-primary w-50 mt-5"
                    type="submit"
                    onClick={EditDetails}
                    className="fa fa-refresh"
                  >
                    {"    "}
                    Update
                  </Button>
                  <Button
                    variant="outline-danger w-50 mt-5"
                    type="submit"
                    onClick={DeleteProduct}
                    className="fa fa-trash"
                  >
                    {"    "}
                    Delete
                  </Button>
                </Form>
              </Col>
            </Row>
          }
        </Container>
      </div>
    );
  };

  return React.Children.toArray(data.map(func)[0]);
}
export default AdminEditProductDetails;
