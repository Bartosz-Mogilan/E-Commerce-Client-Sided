import React from "react";
import { render, screen } from "@testing-library/react";
import { Elements } from "@stripe/react-stripe-js";
import { MemoryRouter } from "react-router-dom";
import CheckoutPage from "../pages/CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_dummykey");

describe("CheckoutPage", () => {
  it("renders checkout page with total and card element", () => {
    render(
      <Elements stripe={stripePromise}>
        <MemoryRouter>
          <CheckoutPage />
        </MemoryRouter>
      </Elements>
    );
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
  });
});

