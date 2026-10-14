// CartItem.jsx - one row inside the cart page.
// PROPS: item, onIncrease, onDecrease, onRemove (callbacks from the parent)
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex flex-wrap align-items-center gap-3">
        <span className="food-emoji" style={{ fontSize: "2.5rem" }}>
          {item.emoji}
        </span>

        <div className="flex-grow-1">
          <h6 className="mb-0">{item.name}</h6>
          <small className="text-muted">₹{item.price} each</small>
        </div>

        {/* Quantity buttons */}
        <div className="btn-group" role="group" aria-label="Change quantity">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onDecrease(item.id)}>
            −
          </button>
          <span className="btn btn-light btn-sm disabled">{item.quantity}</span>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onIncrease(item.id)}>
            +
          </button>
        </div>

        {/* Line total */}
        <strong style={{ minWidth: "70px", textAlign: "right" }}>
          ₹{item.price * item.quantity}
        </strong>

        <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
