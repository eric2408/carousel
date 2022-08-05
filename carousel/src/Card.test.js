import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

it("works when you render", function() {
  render(<Card />);
});

it("works as we expected", function() {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});