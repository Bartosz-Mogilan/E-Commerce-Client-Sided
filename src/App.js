import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Products from "./pages/Products.js";
import About from "./pages/About.js";
import NotFound from "./pages/NotFound.js";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";
import LogoutButton from "./pages/Logout.js";
import ProductDetails from "./pages/ProductDetails.js";
import CheckoutPage from "./pages/CheckoutPage.js";
import OrderHistory from "./pages/OrderHistory.js";
import NavBar from "./components/NavBar.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './App.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}> 
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckoutPage /> } />
            <Route path="/order-history" element={<OrderHistory /> } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Elements>
  );
}

export default App;



