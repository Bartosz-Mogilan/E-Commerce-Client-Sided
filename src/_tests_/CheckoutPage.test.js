import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CheckoutPage from '../pages/CheckoutPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_dummy');

describe('CheckoutPage', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'dummy-token');
    jest.resetAllMocks();
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  test('renders checkout page and displays cart items', async () => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/v1/cart')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: 1,
                name: 'Razer Huntsman V3 Pro',
                price: "199.99",
                quantity: 1,
              },
            ]),
        });
      }
      if (url.includes('/api/v1/checkout/payment-intent')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ clientSecret: 'dummy_secret' }),
        });
      }
      if (url.includes('/api/v1/checkout/confirm')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Checkout confirmed' }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    render(
      <Elements stripe={stripePromise}>
        <CheckoutPage />
      </Elements>
    );

    expect(screen.getAllByText(/Your Cart/i).length).toBeGreaterThan(0);
    await waitFor(() =>
      expect(screen.getByText(/Razer Huntsman V3 Pro/i)).toBeInTheDocument()
    );
    expect(screen.getAllByText(/£199.99/i).length).toBeGreaterThan(0);
  });

  test('displays error if cart fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(
      <Elements stripe={stripePromise}>
        <CheckoutPage />
      </Elements>
    );

    await waitFor(() =>
      expect(screen.getByText(/Failed to fetch cart items/i)).toBeInTheDocument()
    );
  });
});




