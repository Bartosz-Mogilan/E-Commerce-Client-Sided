import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Products">Products</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/About" element={<About/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;