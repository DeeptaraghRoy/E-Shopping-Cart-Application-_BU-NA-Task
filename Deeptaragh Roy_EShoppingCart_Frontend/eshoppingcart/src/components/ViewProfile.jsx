import React, { useEffect, useState } from "react";
import GetProfileDataAxios from "./GetProfileDataAxios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DeleteProfileDataAxios from "./DeleteProfileDataAxios";

function ViewProfile() {
  const [profdata, setprofdata] = useState([]);
  useEffect(() => {
    GetProfileDataAxios.GetProfileDataAxios().then((value) => {
      setprofdata(value);
    });
  }, []);

  const AxiosRequest1 = () => {
    if (window.confirm("Are you sure about deleting this Account ?")) {
      DeleteProfileDataAxios.DeleteProfileDataAxios().then((value) => {
        alert("Profile Data Deleted Successfully");
        sessionStorage.setItem("token", "");
        window.open("http://localhost:3000/", "_self");
      });
    }
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
              placeholder={profdata.address.flatNumber}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicHouseNo">
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="number"
              placeholder={profdata.address.houseNumber}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStreetName">
            <Form.Label>Street Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={profdata.address.streetName}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicColonyName">
            <Form.Label>Colony Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={profdata.address.colonyName}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder={profdata.address.city}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPin">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="number"
              placeholder={profdata.address.pincode}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder={profdata.address.state}
              disabled
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
                  placeholder={profdata.fullName}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>

                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder={profdata.emailId}
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
                  placeholder={profdata.mobileNumber}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAbout">
                <Form.Label>About</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={profdata.about}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={profdata.age}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={profdata.gender}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={profdata.role}
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
            href={"/EditProfile"}
            className="fa fa-pencil"
          >
            {"    "}
            Edit Details
          </Button>
          <Button
            variant="outline-danger w-30 mt-5 ms-5"
            onClick={AxiosRequest1}
            className="fa fa-trash"
          >
            {"    "}
            Delete Account
          </Button>
        </div>
      </Container>
    </>
  );
}

export default ViewProfile;
