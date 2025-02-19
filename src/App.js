import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home.js";
import Products from "./pages/Products.js";
import About from "./pages/About.js";
import NotFound from "./pages/NotFound.js";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";
import LogoutButton from "./pages/Logout.js";
import ProductDetails from "./pages/ProductDetails.js";
import CheckoutPage from "./pages/CheckoutPage.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderHistory from "./pages/OrderHistory.js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
console.log(stripePromise);



function App() {
  return (
    <Elements stripe={stripePromise}> 
    <Router>
      <div>
      <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.navItem}><Link to="/">Home</Link></li>
            <li style={styles.navItem}><Link to="/products">Products</Link></li>
            <li style={styles.navItem}><Link to="/about">About</Link></li>
            <li style={styles.navItem}><Link to="/login">Login</Link></li>
            <li style={styles.navItem}><Link to="/register">Register</Link></li>
            <li style={styles.navItem}><Link to="/logout">Log out</Link></li>
            <li style={styles.navItem}><Link to="/order-history">Order History</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/About" element={<About/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage /> } />
          <Route path="/order-history" element={<OrderHistory /> } />
        </Routes>
      </div>
    </Router>
    </Elements>
  );
};

const styles = {
  nav: {
    padding: '1rem',
    background: '#f0f0f0',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  navItem: {
    margin: '0 0.5rem',
  },
};

export default App;