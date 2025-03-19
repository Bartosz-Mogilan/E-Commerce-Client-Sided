// src/__tests__/Product.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Product from "../components/Product";

describe("Product Component", () => {
  const product = {
    id: 1,
    name: "Test Product",
    description: "Test Description",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
  };

  it("renders product details", () => {
    render(
      <MemoryRouter>
        <Product product={product} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
  });
});

