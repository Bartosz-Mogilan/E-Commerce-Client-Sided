import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registration from '../pages/Registration';

describe('Registration Page', () => {
  test('renders registration form fields and button', () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });
});

