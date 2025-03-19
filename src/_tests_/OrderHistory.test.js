import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrderHistory from "../pages/OrderHistory";

describe("OrderHistory Page", () => {
  it("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <OrderHistory />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading order history/i)).toBeInTheDocument();
  });
});

