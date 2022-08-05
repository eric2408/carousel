import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you render", function() {
  render(<Carousel />);
});

it("works as we expected", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on right then left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("hides arrow when neccesary", function(){
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  expect(leftArrow).toHaveClass("hide");
  expect(rightArrow).not.toHaveClass("hide");

  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass("hide");
  expect(rightArrow).not.toHaveClass("hide");

  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass("hide");
  expect(rightArrow).toHaveClass("hide");

});

