// Checkout.jsx - delivery form with validation + order confirmation modal.
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { calculateBill } from "../utils/billing.js";
import OrderModal from "../components/OrderModal.jsx";

// Checks every field and returns an object of error messages.
// If the object is empty, the form is valid.
function validate(values) {
  const errors = {};

  if (values.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }
  if (!/^[6-9]\d{9}$/.test(values.phone)) {
    errors.phone = "Enter a valid 10-digit mobile number.";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (values.address.trim().length < 10) {
    errors.address = "Address must be at least 10 characters.";
  }
  if (!/^\d{6}$/.test(values.pincode)) {
    errors.pincode = "Pincode must be 6 digits.";
  }
  if (values.payment === "") {
    errors.payment = "Please choose a payment method.";
  }
  return errors;
}

function Checkout() {
  const { cart, dispatch, subtotal } = useCart();
  const navigate = useNavigate();
  const bill = calculateBill(subtotal);

  // ---- useState for form inputs ----
  // One object holds every input value
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    payment: "",
  });
  // Error messages shown under the fields
  const [errors, setErrors] = useState({});
  // Holds the order details after a successful submit (used by the modal)
  const [placedOrder, setPlacedOrder] = useState(null);

  // Runs on every keystroke: updates only the field that changed
  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  // Runs when the form is submitted
  function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading

    const foundErrors = validate(values);
    setErrors(foundErrors);

    // Object.keys(...).length === 0 means "no errors"
    if (Object.keys(foundErrors).length === 0) {
      setPlacedOrder({
        id: "ORD" + Date.now().toString().slice(-6),
        name: values.name,
        total: bill.total,
        payment: values.payment,
      });
      dispatch({ type: "CLEAR_CART" }); // empty the cart (useReducer)
    }
  }

  // Called when the user closes the confirmation modal
  function handleCloseModal() {
    setPlacedOrder(null);
    navigate("/"); // go back to the home page
  }

  // After a successful order, the cart is empty, so we must show the modal first
  if (placedOrder) {
    return <OrderModal order={placedOrder} onClose={handleCloseModal} />;
  }

  // Nothing to check out
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty</h3>
        <p className="text-muted">Add some items before checking out.</p>
        <Link to="/" className="btn btn-brand">
          Browse menu
        </Link>
      </div>
    );
  }

  // Small helper to add Bootstrap's red border when a field has an error
  const inputClass = (field) => "form-control" + (errors[field] ? " is-invalid" : "");

  return (
    <div className="container py-4">
      <h2 className="mb-3">Checkout</h2>

      <div className="row g-4">
        {/* Delivery form */}
        <div className="col-lg-8">
          <form className="card shadow-sm" onSubmit={handleSubmit} noValidate>
            <div className="card-body">
              <h5 className="mb-3">Delivery details</h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="name">Full name</label>
                  <input id="name" name="name" className={inputClass("name")} value={values.name} onChange={handleChange} />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="phone">Mobile number</label>
                  <input id="phone" name="phone" className={inputClass("phone")} value={values.phone} onChange={handleChange} maxLength={10} />
                  <div className="invalid-feedback">{errors.phone}</div>
                </div>

                <div className="col-12">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" className={inputClass("email")} value={values.email} onChange={handleChange} />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>

                <div className="col-12">
                  <label className="form-label" htmlFor="address">Delivery address</label>
                  <textarea id="address" name="address" rows="3" className={inputClass("address")} value={values.address} onChange={handleChange}></textarea>
                  <div className="invalid-feedback">{errors.address}</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="pincode">Pincode</label>
                  <input id="pincode" name="pincode" className={inputClass("pincode")} value={values.pincode} onChange={handleChange} maxLength={6} />
                  <div className="invalid-feedback">{errors.pincode}</div>
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="payment">Payment method</label>
                  <select id="payment" name="payment" className={"form-select" + (errors.payment ? " is-invalid" : "")} value={values.payment} onChange={handleChange}>
                    <option value="">Choose...</option>
                    <option value="Cash on delivery">Cash on delivery</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                  </select>
                  <div className="invalid-feedback">{errors.payment}</div>
                </div>
              </div>

              <button type="submit" className="btn btn-brand mt-4">
                Place order · ₹{bill.total}
              </button>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Order summary</h5>
              {cart.map((item) => (
                <div className="d-flex justify-content-between small mb-1" key={item.id}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between small">
                <span>Subtotal</span><span>₹{subtotal}</span>
              </div>
              <div className="d-flex justify-content-between small">
                <span>Delivery</span><span>{bill.delivery === 0 ? "Free" : "₹" + bill.delivery}</span>
              </div>
              <div className="d-flex justify-content-between small">
                <span>GST (5%)</span><span>₹{bill.gst}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span><span className="text-brand">₹{bill.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
