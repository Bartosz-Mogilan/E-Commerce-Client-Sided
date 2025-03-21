import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/cart', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data);
        const total = data.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0);
        setTotalAmount(total);
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setError(err.message);
      }
    };
    fetchCart();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const token = localStorage.getItem('token');

    try {
      const intentResponse = await fetch('http://localhost:5000/api/v1/checkout/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!intentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }
      const intentData = await intentResponse.json();
      const clientSecret = intentData.clientSecret;

      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const confirmResponse = await fetch('http://localhost:5000/api/v1/checkout/confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!confirmResponse.ok) {
            throw new Error('Checkout confirmation failed');
          }
          setPaymentSucceeded(true);
          setError('');
          setProcessing(false);
          setCartItems([]);
        }
      }
    } catch (err) {
      setError('Payment failed: ' + err.message);
      setProcessing(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Checkout</h1>
      <div style={styles.cart}>
        <h3>Your Cart</h3>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <p>
                {item.name} (x{item.quantity}) - £{item.price}
              </p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <h4>Total: £{totalAmount.toFixed(2)}</h4>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <CardElement options={cardStyle} />
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" disabled={!stripe || processing} style={styles.button}>
          {processing ? 'Processing…' : 'Pay Now'}
        </button>
      </form>
      {paymentSucceeded && <p style={styles.success}>Payment succeeded! Thank you for your purchase.</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  cart: {
    marginBottom: '2rem',
  },
  cartItem: {
    borderBottom: '1px solid #ccc',
    padding: '0.5rem 0',
  },
  form: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.8rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
  success: {
    color: 'green',
    marginTop: '1rem',
  },
};

const cardStyle = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export default CheckoutPage;

