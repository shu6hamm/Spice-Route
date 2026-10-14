// Navbar.jsx - shared top navigation bar shown on every page.
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
  // Read the total number of items from the cart context for the badge
  const { totalItems } = useCart();

  // NavLink gives us "isActive" so we can highlight the current page
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " fw-bold text-brand" : "");

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand navbar-brand-text" to="/">
          🍽️ Spice Route
        </Link>

        {/* Hamburger button for small screens (works through Bootstrap's JS bundle) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-md-center">
            <li className="nav-item">
              <NavLink className={linkClass} to="/" end>
                Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/cart">
                Cart{" "}
                {/* Show the badge only when the cart has items */}
                {totalItems > 0 && (
                  <span className="badge rounded-pill bg-danger">{totalItems}</span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/checkout">
                Checkout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
