import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "../pages/ProductDetails";

describe("ProductDetails Page", () => {
  it("renders loading state initially", () => {
    render(
      <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading product details/i)).toBeInTheDocument();
  });
});

