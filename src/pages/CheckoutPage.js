import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const CheckoutPage = ({ cartItems, useElements}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [ error, setError ] = useState('');
    const [ processing, setProcessing ] = useState(false);
    const [ paymentSucceeded, setPaymentSucceeded ] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        try {
            const response = await fetch('http://localhost:5000/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: totalAmount })
            });

            const data = await response.json();
            const clientSecret = data.clientSecret;

            const cardElement = elements.getElement(CardElement);
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if(result.error) {
                setError(result.error.message);
                setProcessing(false);
            } else {
                if(result.paymentIntent.status === 'succeeded') {
                    setPaymentSucceeded(true);
                    setError('');
                    setProcessing(false);
                }
            }
        } catch (err) {
            setError('Payment failed: ', + err.message);
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
                <div key={item.product.id} style={styles.cartItem}>
                  <p>{item.product.name} (x{item.quantity})</p>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
            <h4>Total: £{(totalAmount / 100).toFixed(2)}</h4>
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
      margin: '0 auto'
    },
    cart: {
      marginBottom: '2rem'
    },
    cartItem: {
      borderBottom: '1px solid #ccc',
      padding: '0.5rem 0'
    },
    form: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem'
    },
    error: {
      color: 'red',
      marginTop: '1rem'
    },
    button: {
      marginTop: '1rem',
      padding: '0.8rem 1.2rem',
      fontSize: '1rem',
      cursor: 'pointer'
    },
    success: {
      color: 'green',
      marginTop: '1rem'
    }
  };

export default CheckoutPage;