// NotFound.jsx - 404 page, shown for any URL that does not match a route.
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <div className="food-emoji-large mb-3">🍽️</div>
      <h1>404</h1>
      <p className="text-muted">Oops! This page is not on our menu.</p>
      <Link to="/" className="btn btn-brand">
        Go to home
      </Link>
    </div>
  );
}

export default NotFound;
