import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CartBtn from "./buttons/CartBtn";
import Login from "./buttons/Login";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { allItem } from "../redux/actions/index";
import GetAllItemsAxios from "./GetAllItemsAxios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import Row from "react-bootstrap/Row";

import Signup from "./buttons/Signup";
import { Link } from "react-router-dom";

const Header = () => {
  const state1 = useSelector((state1) => state1.allItem);
  const state = useSelector((state) => state.addItem);
  const [fullName, setfullName] = useState("");
  const [role, setrole] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    GetAllItemsAxios.GetAllItemsAxios().then((value) => {
      console.log("cart ", value);
      if (!(value.length == 1 && value[0] === "AUTHORIZATION FAILED")) {
        //if(state1.length<1)
        //{
        dispatch(allItem(value));
        //}
      }
    });
  }, [state]);

  const viewProfile1 = () => {
    viewProfile().then((value1) => {
      console.log(value1.fullName);
      setfullName(value1.fullName);
      setrole(value1.role);
      return value1.fullName;
    });
  };

  const logout = () => {
    if (sessionStorage.getItem("token") !== "") {
      sessionStorage.setItem("token", "");
      alert("SUCCESSFULLY LOGGED OUT");
      window.open("http://localhost:3000/", "_self");
    } else alert("PLEASE LOGIN FIRST");
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid className="py-2">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" className="fa fa-home">
              {"    "}
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/product" className="fa fa-shopping-bag">
              {"    "}
              Product
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fa fa-info-circle">
              {"    "}
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fa fa-phone">
              {"    "}
              Contact
            </Nav.Link>
          </Nav>

          <Navbar.Brand to="#" className="mx-auto fw-bolder">
            E-SHOPPING CART
          </Navbar.Brand>
          {sessionStorage.getItem("token") !== "" && (
            <div>
              <DropdownButton
                variant="outline-primary fa fa-user"
                id="dropdown-basic-button"
                title={" " + fullName}
              >
                {viewProfile1()}
                <Dropdown.Item href={"/ViewProfile"}>
                  Profile Details
                </Dropdown.Item>
                {role == "admin" && (
                  <Dropdown.Item href={"/AdminEdit"}>
                    Edit Products
                  </Dropdown.Item>
                )}
              </DropdownButton>{" "}
            </div>
          )}
          {sessionStorage.getItem("token") === "" && <Login />}

          {sessionStorage.getItem("token") !== "" && (
            <Button variant="outline-primary ms-2" onClick={logout}>
              <span className="fa fa-sign-out me-1"> Logout</span>
            </Button>
          )}
          {sessionStorage.getItem("token") === "" && <Signup />}

          <CartBtn />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

async function viewProfile() {
  let url = "http://localhost:8084/profilejwt/ViewProfile";
  let axiosResponse;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  };
  let result;
  let error = "";
  console.log("in func");
  try {
    axiosResponse = await axios.get(url, config).catch((err) => {
      if (err.response.status !== 200) {
        console.log(err.response.status);
        error = err.response.status;
        throw new Error("CANNOT FETCH ACCOUNT");
      }
      throw err;
    });
  } catch (err) {
    alert(err);
    result = err;
  }
  if (error === "") {
    result = axiosResponse.data;
  }
  console.log("profile ", axiosResponse);

  return result;
}
export default Header;
