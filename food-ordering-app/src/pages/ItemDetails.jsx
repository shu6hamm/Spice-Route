// ItemDetails.jsx - details page for one item, reached through /item/:id
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { foodItems } from "../data/foodItems.js";
import { useCart } from "../context/CartContext.jsx";

function ItemDetails() {
  // useParams reads the :id part of the URL (it is always a string)
  const { id } = useParams();
  const { dispatch } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Find the item whose id matches the URL
  const item = foodItems.find((food) => food.id === Number(id));

  // If the id in the URL does not exist, show a friendly message
  if (!item) {
    return (
      <div className="container py-5 text-center">
        <h3>Item not found</h3>
        <Link to="/" className="btn btn-brand mt-2">
          Back to menu
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    dispatch({ type: "ADD_ITEM", payload: item, quantity: quantity });
    setAdded(true);
  }

  return (
    <div className="container py-4">
      <Link to="/" className="text-decoration-none">
        ← Back to menu
      </Link>

      <div className="card shadow-sm mt-3">
        <div className="row g-0 align-items-center">
          <div className="col-md-5 text-center p-4">
            <div className="food-emoji-large">{item.emoji}</div>
          </div>

          <div className="col-md-7">
            <div className="card-body">
              <h2>{item.name}</h2>
              <p>
                <span className={"badge " + (item.veg ? "bg-success" : "bg-danger")}>
                  {item.veg ? "Veg" : "Non-veg"}
                </span>{" "}
                <span className="badge bg-light text-dark border">{item.category}</span>
              </p>
              <p>{item.description}</p>
              <p className="text-muted">
                ⭐ {item.rating} rating · ⏱ {item.prepTime} min preparation
              </p>
              <h3 className="text-brand">₹{item.price}</h3>

              {/* Quantity selector (useState) */}
              <div className="d-flex align-items-center gap-3 my-3">
                <div className="btn-group">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <span className="btn btn-light disabled">{quantity}</span>
                  <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </button>
                </div>
                <strong>Total: ₹{item.price * quantity}</strong>
              </div>

              <button className="btn btn-brand me-2" onClick={handleAddToCart}>
                Add to cart
              </button>

              {added && (
                <div className="alert alert-success mt-3 py-2">
                  Added to cart. <Link to="/cart">Go to cart</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
