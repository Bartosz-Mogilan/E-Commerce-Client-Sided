import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/v1/orders', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
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

  if (loading) {
    return <div>Loading order history...</div>;
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
        <div key={order.id} style={styles.orderCard}>
          <h2>Order #{order.id}</h2>
          <p>Status: {order.status}</p>
          <h3>Items:</h3>
          {order.items.map(item => (
            <div key={item.id} style={styles.item}>
              <p>
                <strong>Product ID: {item.product_id}</strong> - Quantity: {item.quantity} - Price: £{item.price}
              </p>
            </div>
          ))}
          <p>Ordered on: {new Date(order.created_at).toLocaleDateString()}</p>
          <p>Total: £{order.total_price}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  orderCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  item: {
    padding: '0.5rem 0',
  },
};

export default OrderHistory;



