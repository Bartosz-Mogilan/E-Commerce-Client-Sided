import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Product from '../components/Product';

describe('Product Component', () => {
  const product = {
    id: 1,
    name: 'Razer Huntsman V3 Pro',
    description: 'High-end gaming keyboard featuring Razer optical switches and RGB lighting',
    imageUrl: 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306595/razer-huntsman-v3-pro-hero-desktop-v3_scwicm.webp',
  };

  test('renders product details', () => {
    render(
      <MemoryRouter>
        <Product product={product} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Razer Huntsman V3 Pro/i)).toBeInTheDocument();
    expect(screen.getByText(/High-end gaming keyboard/i)).toBeInTheDocument();
    const image = screen.getByAltText(/Razer Huntsman V3 Pro/i);
    expect(image).toHaveAttribute('src', product.imageUrl);
  });
});

