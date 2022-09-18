import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Contact = () => {
  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col className="text-center py-4 my-4">
            <h1>Have Some Questions?</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <img
              src="/assets/images/contact.jpg"
              alt="Contact Us"
              height="400px"
              width="550px"
            />
          </Col>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="FirstName LastName" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Query</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Button variant="outline-primary ms-2" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container style={{ height: "215px" }}></Container>
    </>
  );
};

export default Contact;
