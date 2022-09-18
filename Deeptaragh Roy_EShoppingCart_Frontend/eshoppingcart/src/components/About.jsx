import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <Container className="py-5 my-5">
      <Row>
        <Col>
          <h1 className="text-primary fw-bolder mb-4">About Us</h1>
          <p className="lead mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
            voluptatibus cupiditate voluptates! Quae, dignissimos beatae facere
            maiores nemo blanditiis voluptate impedit temporibus veniam
            consequatur vero cum, nihil omnis est ex? Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Neque voluptatibus cupiditate
            voluptates! Quae, dignissimos beatae facere maiores nemo blanditiis
            voluptate impedit temporibus veniam consequatur vero cum, nihil
            omnis est ex?Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Neque voluptatibus cupiditate voluptates! Quae, dignissimos
            beatae facere maiores nemo blanditiis voluptate impedit temporibus
            veniam consequatur vero cum, nihil omnis est ex? Lorem ipsum dolor
            sit amet consectetur, adipisicing elit. Neque voluptatibus
            cupiditate voluptates! Quae, dignissimos beatae facere maiores nemo
            blanditiis voluptate impedit temporibus veniam consequatur vero cum,
            nihil omnis est ex?Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Saepe eaque, culpa maiores voluptatem quia quam,
            corporis rerum at, omnis incidunt architecto alias. A eos voluptate
            eveniet ipsa consequuntur facilis nobis.
          </p>
          <NavLink to={"/contact"} className="btn btn-outline-primary px-3">
            Contact Us
          </NavLink>
        </Col>
        <Col className="d-flex justify-content-center">
          <img
            src="/assets/images/about.png"
            alt="About Us"
            height="800px"
            width="800px"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default About;
