import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from '../pages/Products';

describe('Products Page', () => {
  test('renders products page with search bar and heading', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Search for a product/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Products/i)).toBeInTheDocument();
  });
});

