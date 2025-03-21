import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App.js';

test('renders NavBar with Home link', () => {
  render(<App />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

