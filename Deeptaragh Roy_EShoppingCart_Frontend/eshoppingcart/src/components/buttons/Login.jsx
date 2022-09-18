import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import ReactDOM from "react-dom";

function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Button trigger modal */}
      <Button variant="outline-primary ms-2" onClick={handleShow}>
        <span className="fa fa-sign-in me-1"> Login</span>
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Button variant="primary w-100 mb-4">
            <span className="fa fa-google me-2"> Sign in with Google</span>
          </Button>
          <Button variant="primary w-100 mb-4">
            <span className="fa fa-facebook-official me-2">
              {" "}
              Sign in with Facebook
            </span>
          </Button> */}
          <Form onSubmit={authenticate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button
              variant="outline-primary w-100 mt-5"
              type="submit"
              className="fa fa-share"
            >
              {"    "}
              Submit
            </Button>
            <div id="formError" style={{ display: "none" }}>
              <p style={{ color: "red", fontWeight: "bolder" }}>
                Wrong Credentials! Please try again... !
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

async function authenticate(event) {
  let token;
  let axiosResponse;
  event.preventDefault();
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
          throw new Error("WRONG CREDENTIALS PLEASE TRY AGAIN");
        }
        throw err;
      });
    } catch (err) {
      if (document.getElementById("formError").style.display == "none") {
        document.getElementById("formError").style.display = "block";
      }
    }
    if (error === "") {
      token = axiosResponse.data;
      console.log(axiosResponse);
      console.log(token.jwtToken);
      alert("SUCCESSFULLY LOGGED IN");
      sessionStorage.setItem("token", token.jwtToken);
      window.open("http://localhost:3000/", "_self");
    }
  } else {
    alert("YOU ARE ALREADY LOGGED IN");
  }
}
export default Login;
