import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar Component", () => {
  it("renders Login when no token is present", () => {
    localStorage.removeItem("token");
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Log out/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Order History/i)).not.toBeInTheDocument();
  });

  it("renders Order History and Log out when token is present", () => {
    localStorage.setItem("token", "dummy-token");
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Order History/i)).toBeInTheDocument();
    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
  });
});


