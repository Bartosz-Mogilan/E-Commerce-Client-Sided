import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/orders', { credentials: 'include' })
      .then(response => {
        if (response.status === 401) {
          navigate('/login');
          return Promise.reject(new Error('Unauthorized'));
        }
        if (!response.ok) {
          throw new Error('Failed to fetch order history');
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
      setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  if(loading) {
    return <div>Loading order history...</div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (orders.length === 0) {
    return <div>No past orders found.</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Your Order History</h1>
      {orders.map(order => (
        <div key={order._id} style={styles.orderCard}>
          <h2>Order #{order._id}</h2>
          <p>Status: {order.status}</p>
          <h3>Items:</h3>
          {order.items.map(item => (
            <div key={item._id} style={styles.item}>
              <p>
                <strong>{item.product.name}</strong> - Quantity: {item.quantity}
              </p>
            </div>
          ))}
          <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  orderCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem'
  },
  item: {
    padding: '0.5rem 0'
  }
};

export default OrderHistory;