import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('About Page', () => {
  it('renders about information', () => {
    render(<About />);
    expect(screen.getByText(/About TechGear Hub/i)).toBeInTheDocument();
    expect(
      screen.getByText(/we are passionate about delivering the best in tech gadgets/i)
    ).toBeInTheDocument();
  });
});


