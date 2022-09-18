import React from "react";
import { Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer
        style={{
          bottom: 0,
          width: "100%",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
        }}
        className="text-muted"
      >
        Copyright &copy; Deeptaragh Roy powered by Capgemini (2022)
        <Nav className="justify-content-center">
          <Nav.Link as={Link} to="/about" className="fa fa-info-circle">
            {"    "}
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" className="fa fa-phone">
            {"    "}
            Contact
          </Nav.Link>
        </Nav>
      </footer>
    </div>
  );
};

export default Footer;
