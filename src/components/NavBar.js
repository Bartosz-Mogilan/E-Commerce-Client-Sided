import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/">Home</Link></li>
        <li style={styles.navItem}><Link to="/products">Products</Link></li>
        <li style={styles.navItem}><Link to="/about">About</Link></li>
        {isAuthenticated ? (
          <>
            <li style={styles.navItem}><Link to="/order-history">Order History</Link></li>
            <li style={styles.navItem}><Link to="/logout">Log out</Link></li>
          </>
        ) : (
          <li style={styles.navItem}><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '1rem',
    background: '#333',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 0.5rem',
  },
};

export default NavBar;

