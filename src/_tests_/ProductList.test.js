import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductList from "../components/ProductList";

describe("ProductList Component", () => {
  it("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
  });
});

