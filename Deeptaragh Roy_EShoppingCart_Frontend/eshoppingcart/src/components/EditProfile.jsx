import React, { useEffect, useState } from "react";
import GetProfileDataAxios from "./GetProfileDataAxios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import EditProfileDataAxios from "./EditProfileDataAxios";

function EditProfile() {
  const [profdata, setprofdata] = useState([]);
  useEffect(() => {
    GetProfileDataAxios.GetProfileDataAxios().then((value) => {
      setprofdata(value);
    });
  }, []);

  const AxiosRequest = () => {
    let name = document.getElementById("formBasicName").value;
    let email = document.getElementById("formBasicEmail").value;
    let mobno = document.getElementById("formBasicMobNo").value;
    let about = document.getElementById("formBasicAbout").value;
    let age = document.getElementById("formBasicAge").value;
    let gender = document.getElementById("formBasicGender").value;
    let role = profdata.role;
    let password = profdata.password;
    let flatNumber = document.getElementById("formBasicFlatNo").value;
    let houseNumber = document.getElementById("formBasicHouseNo").value;
    let streetName = document.getElementById("formBasicStreetName").value;
    let colonyName = document.getElementById("formBasicColonyName").value;
    let city = document.getElementById("formBasicCity").value;
    let pincode = document.getElementById("formBasicPin").value;
    let state = document.getElementById("formBasicState").value;

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
    EditProfileDataAxios.EditProfileDataAxios(body).then((value) => {
      alert("Profile Data Updated Successfully");
      window.open("http://localhost:3000/", "_self");
    });
  };

  const ReturnToProfile = () => {
    window.open("http://localhost:3000/ViewProfile", "_self");
  };

  const viewAddress = () => {
    console.log("test view Address");
    return (
      <div>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label className=" mb-3 fw-bolder">ADDRESS DETAILS</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicFlatNo">
            <Form.Label>Flat Number</Form.Label>
            <Form.Control
              type="number"
              defaultValue={profdata.address.flatNumber}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicHouseNo">
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="number"
              defaultValue={profdata.address.houseNumber}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStreetName">
            <Form.Label>Street Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={profdata.address.streetName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicColonyName">
            <Form.Label>Colony Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={profdata.address.colonyName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              defaultValue={profdata.address.city}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPin">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="number"
              defaultValue={profdata.address.pincode}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              defaultValue={profdata.address.state}
              required
            />
          </Form.Group>
        </Form.Group>
      </div>
    );
  };

  return (
    <>
      <Container className="py-2">
        <Row>
          <Col className="text-center">
            <h1>PROFILE DETAILS</h1>
            <hr />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-md-6 px-5">
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label className=" mb-3 fw-bolder">USER DETAILS</Form.Label>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={profdata.fullName}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>

                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="email"
                    defaultValue={profdata.emailId}
                    disabled
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMobNo">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={profdata.mobileNumber}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAbout">
                <Form.Label>About</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={profdata.about}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={profdata.age}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={profdata.gender}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={profdata.role}
                  disabled
                />
              </Form.Group>
            </Form.Group>
          </Col>
          <Col className="col-md-6 px-5">
            {profdata.address !== undefined && viewAddress()}
          </Col>
        </Row>
        <div className="justify-content-center">
          <Button
            variant="outline-primary w-30 mt-5"
            onClick={AxiosRequest}
            className="fa
            fa-refresh"
          >
            {"    "}
            Apply Changes
          </Button>
          <Button
            variant="outline-secondary w-30 mt-5"
            onClick={ReturnToProfile}
            className="fa fa-ban mx-5"
          >
            {"    "}
            Cancel
          </Button>
        </div>
      </Container>
    </>
  );
}

export default EditProfile;
