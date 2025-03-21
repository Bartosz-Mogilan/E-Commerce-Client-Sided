import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Login Page', () => {
  test('renders login form fields and buttons', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    const loginElements = screen.getAllByText(/Login/i);
    expect(loginElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Google/i)).toBeInTheDocument();
    expect(screen.getByText(/Facebook/i)).toBeInTheDocument();
  });
});



