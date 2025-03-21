import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home Page', () => {
  test('renders welcome message and description', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to TechGear Hub/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Your one-stop shop for cutting-edge tech gadgets and gaming accessories/i)
    ).toBeInTheDocument();
  });
});

