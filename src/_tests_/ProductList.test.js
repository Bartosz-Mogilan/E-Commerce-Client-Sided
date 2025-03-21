import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductList from '../components/ProductList';

describe('ProductList Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              name: 'Razer Huntsman V3 Pro',
              description: 'High-end gaming keyboard featuring Razer optical switches and RGB lighting',
              price: "199.99",
              imageUrl:
                'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306595/razer-huntsman-v3-pro-hero-desktop-v3_scwicm.webp',
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders loading state then displays products', async () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/Razer Huntsman V3 Pro/i)).toBeInTheDocument()
    );
  });
});

