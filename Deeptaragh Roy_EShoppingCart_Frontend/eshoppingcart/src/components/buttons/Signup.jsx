import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ReactDOM from "react-dom";
import axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const chnageCheckbox = () => {
    if (checkbox == false) {
      setCheckbox(true);
      ReactDOM.findDOMNode(document.getElementById("checkboxText")).value =
        "admin";
    } else {
      setCheckbox(false);
      ReactDOM.findDOMNode(document.getElementById("checkboxText")).value =
        "user";
    }
  };
  return (
    <>
      {/* Button trigger modal */}
      <Button variant="outline-primary ms-2" onClick={handleShow}>
        <span className="fa fa-user-plus me-1"> Sign Up</span>
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="fa fa-sign-up me-1">Register</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={signup}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>

              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control type="email" placeholder="Enter email" required />
              </InputGroup>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMobNo">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Contact Number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAbout">
              <Form.Label>About</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tell us About Yourself"
                defaultValue=""
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="Enter Age" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Specify your Gender"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRoll">
              <Form.Check
                type="checkBox"
                id="custom-switch"
                label="Admin"
                onChange={chnageCheckbox}
              />
              <Form.Text className="text-muted" id="checkboxText"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label className=" mb-3 fw-bolder">
                ADDRESS DETAILS
              </Form.Label>
              <Form.Group className="mb-3" controlId="formBasicFlatNo">
                <Form.Label>Flat Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Flat Number"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicHouseNo">
                <Form.Label>House Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter House Number"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicStreetName">
                <Form.Label>Street Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Street Name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicColonyName">
                <Form.Label>Colony Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Colony Name"
                  defaultValue=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPin">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Full Pincode"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicState">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="Enter State" required />
              </Form.Group>
            </Form.Group>

            <Button
              variant="outline-primary w-100 mt-5"
              type="submit"
              className="fa fa-share"
            >
              {"    "}
              Register
            </Button>
            <div id="formError" style={{ display: "none" }}>
              <p id="pError" style={{ color: "red", fontWeight: "bolder" }}></p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
async function signup(event) {
  let token;
  let axiosResponse;
  event.preventDefault();
  if (
    sessionStorage.getItem("token") == "" ||
    sessionStorage.getItem("token") == null
  ) {
    let name = document.getElementById("formBasicName").value;
    let email = document.getElementById("formBasicEmail").value;
    let mobno = document.getElementById("formBasicMobNo").value;
    let about = document.getElementById("formBasicAbout").value;
    let age = document.getElementById("formBasicAge").value;
    let gender = document.getElementById("formBasicGender").value;
    let role;
    if (document.getElementById("checkboxText").value == "admin")
      role = "admin";
    else role = "user";
    let password = document.getElementById("formBasicPassword").value;
    let flatNumber = document.getElementById("formBasicFlatNo").value;
    let houseNumber = document.getElementById("formBasicHouseNo").value;
    let streetName = document.getElementById("formBasicStreetName").value;
    let colonyName = document.getElementById("formBasicColonyName").value;
    let city = document.getElementById("formBasicCity").value;
    let pincode = document.getElementById("formBasicPin").value;
    let state = document.getElementById("formBasicState").value;

    console.log(email);
    console.log(password);
    console.log(role);

    let url = "http://localhost:8084/profilejwt/Signup";
    let body = {
      fullName: name,
      emailId: email,
      mobileNumber: mobno,
      about: about,
      age: age,
      gender: gender,
      role: role,
      password: password,
      address: {
        flatNumber: flatNumber,
        houseNumber: houseNumber,
        streetName: streetName,
        colonyName: colonyName,
        city: city,
        pincode: pincode,
        state: state,
      },
    };
    console.log(body);

    let error = "";
    try {
      axiosResponse = await axios.post(url, body).catch((err) => {
        if (err.response.status == 403) {
          error = err.response.status;
          throw new Error("USER ALREADY EXISTS PLEASE TRY ANOTHER EMAIL!");
        } else {
          if (err.response.status !== 200) {
            console.log(err.response.status);
            error = err.response.status;
            throw new Error("SIGNUP FAILED");
          }
        }
        throw err;
      });
    } catch (err) {
      // alert(err);
      if (document.getElementById("formError").style.display == "none") {
        document.getElementById("pError").innerHTML = err;
        document.getElementById("formError").style.display = "block";
      }
    }
    if (error === "") {
      //token = axiosResponse.data;
      //console.log(axiosResponse);
      //console.log(token.jwtToken);
      alert("SUCCESSFULLY SIGNED IN");
      //sessionStorage.setItem("token", token.jwtToken);
      //window.open("http://localhost:3000/", "_self");
      {
        authenticate();
      }
    }
  } else {
    alert("PLEASE LOGOUT TO SINGUP");
  }
}

async function authenticate() {
  let token;
  let axiosResponse;

  if (
    sessionStorage.getItem("token") === "" ||
    sessionStorage.getItem("token") === null
  ) {
    let email = document.getElementById("formBasicEmail").value;
    let password = document.getElementById("formBasicPassword").value;
    console.log(email);
    console.log(password);

    let url = "http://localhost:8084/profilejwt/authenticate";
    let body = { username: email, password: password };
    console.log(body);

    let error = "";
    try {
      axiosResponse = await axios.post(url, body).catch((err) => {
        if (err.response.status !== 200) {
          console.log(err.response.status);
          error = err.response.status;
          throw new Error("SOMETING WENT WRONG CANNOT LOGIN");
        }
        throw err;
      });
    } catch (err) {
      alert(err);
    }
    if (error === "") {
      token = axiosResponse.data;
      console.log(axiosResponse);
      console.log(token.jwtToken);
      //alert("SUCCESSFULLY LOGGED IN");
      sessionStorage.setItem("token", token.jwtToken);
      window.open("http://localhost:3000/", "_self");
    }
  } else {
    alert("YOU ARE ALREADY LOGGED IN");
  }
}

export default Signup;
