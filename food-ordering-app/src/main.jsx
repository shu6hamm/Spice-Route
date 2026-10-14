// Entry point: starts React and mounts <App /> into the #root div.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Bootstrap 5 CSS (installed through npm)
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap JS (needed only for the mobile hamburger menu in the Navbar)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Our own small custom styles
import "./index.css";

import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter enables routing (URLs like /cart, /item/3) */}
    <BrowserRouter>
      {/* CartProvider makes the cart available to every component */}
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
