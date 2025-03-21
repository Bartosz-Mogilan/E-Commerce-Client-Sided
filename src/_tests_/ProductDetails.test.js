import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from '../pages/ProductDetails';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ProductDetails Page', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/v1/products/')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              id: 1,
              name: 'Razer Huntsman V3 Pro',
              description: 'High-end gaming keyboard featuring Razer optical switches and RGB lighting',
              price: "199.99",
              imageUrl: 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306595/razer-huntsman-v3-pro-hero-desktop-v3_scwicm.webp',
            }),
        });
      }
      if (url.includes('/api/v1/cart')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Product added to cart' }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });
    localStorage.setItem('token', 'dummy-token');
    mockNavigate.mockReset();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders product details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Razer Huntsman V3 Pro/i)).toBeInTheDocument()
    );
    expect(
      screen.getByText(/High-end gaming keyboard featuring Razer optical switches/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Price: £199.99/i)).toBeInTheDocument();
  });

  test('navigates to checkout when Add to Cart is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Razer Huntsman V3 Pro/i)).toBeInTheDocument()
    );
    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/checkout'));
  });
});



