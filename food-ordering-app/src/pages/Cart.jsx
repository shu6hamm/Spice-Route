// Cart.jsx - shows all cart items with quantity update, remove and totals.
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import CartItem from "../components/CartItem.jsx";
import { calculateBill, FREE_DELIVERY_ABOVE } from "../utils/billing.js";

function Cart() {
  const { cart, dispatch, subtotal } = useCart();
  const bill = calculateBill(subtotal);

  // Empty cart view
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="food-emoji mb-3">🛒</div>
        <h3>Your cart is empty</h3>
        <p className="text-muted">Add something tasty from the menu.</p>
        <Link to="/" className="btn btn-brand">
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Your cart</h2>

      <div className="row g-4">
        {/* Left side: list of items */}
        <div className="col-lg-8">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={(id) => dispatch({ type: "CHANGE_QUANTITY", id: id, change: 1 })}
              onDecrease={(id) => dispatch({ type: "CHANGE_QUANTITY", id: id, change: -1 })}
              onRemove={(id) => dispatch({ type: "REMOVE_ITEM", id: id })}
            />
          ))}

          <button className="btn btn-link text-danger" onClick={() => dispatch({ type: "CLEAR_CART" })}>
            Clear cart
          </button>
        </div>

        {/* Right side: bill summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Bill summary</h5>
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery</span>
                <span>{bill.delivery === 0 ? "Free" : "₹" + bill.delivery}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>GST (5%)</span>
                <span>₹{bill.gst}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span className="text-brand">₹{bill.total}</span>
              </div>
              {bill.delivery > 0 && (
                <small className="text-muted d-block mt-2">
                  Add ₹{FREE_DELIVERY_ABOVE - subtotal} more for free delivery.
                </small>
              )}
              <Link to="/checkout" className="btn btn-brand w-100 mt-3">
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
