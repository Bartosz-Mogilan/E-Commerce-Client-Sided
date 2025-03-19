import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

describe("Home Page", () => {
  it("renders welcome message", () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to TechGear Hub/i)).toBeInTheDocument();
  });
});

