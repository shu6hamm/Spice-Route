// OrderModal.jsx - confirmation popup shown after a successful order.
// It is a Bootstrap modal controlled by React (no Bootstrap JavaScript needed).
// PROPS: order (details of the placed order), onClose (callback)
function OrderModal({ order, onClose }) {
  return (
    <>
      {/* Dark background behind the modal */}
      <div className="modal-backdrop fade show"></div>

      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center p-3">
            <div className="modal-body">
              <div className="food-emoji mb-2">🎉</div>
              <h4>Order placed!</h4>
              <p className="mb-1">
                Thank you, <strong>{order.name}</strong>.
              </p>
              <p className="mb-1">
                Order ID: <strong>{order.id}</strong>
              </p>
              <p className="mb-1">
                Amount to pay: <strong>₹{order.total}</strong> ({order.payment})
              </p>
              <p className="text-muted small">Your food will reach you in about 30–40 minutes.</p>
            </div>
            <div className="modal-footer justify-content-center border-0">
              <button className="btn btn-brand" onClick={onClose}>
                Back to menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
