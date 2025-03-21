import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderHistory from '../pages/OrderHistory.js';

describe('OrderHistory Page', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'dummy-token');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <OrderHistory />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading order history/i)).toBeInTheDocument();
  });

  test('renders order history data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              status: 'completed',
              total_price: "399.99",
              created_at: '2024-01-01T00:00:00.000Z',
              items: [{ id: 1, product_id: 2, quantity: 1, price: "399.99" }],
            },
          ]),
      })
    );
    render(
      <MemoryRouter>
        <OrderHistory />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText(/Order #1/i)).toBeInTheDocument());
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    const priceElements = screen.getAllByText(/£399.99/i);
    expect(priceElements.length).toBeGreaterThan(0);
  });
});



