import React from "react";
import ReactDOM from "react-dom";
import About from "../Contact";

import { render } from "@testing-library/react";
// import "jest-dom/extend-expect";
import "@testing-library/jest-dom";

import renderer from "react-test-renderer";

it("matches snapshot", () => {
  const tree = renderer.create(<About></About>).toJSON();
  expect(tree).toMatchSnapshot();
});
