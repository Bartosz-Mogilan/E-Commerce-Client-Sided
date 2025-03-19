import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Products from "../pages/Products";

describe("Products Page", () => {
  it("renders products page with search bar", () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Search for a product/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Products/i)).toBeInTheDocument();
  });
});

