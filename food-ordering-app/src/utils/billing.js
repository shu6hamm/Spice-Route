// billing.js - helper used by both the Cart page and the Checkout page.

// Bill rules (kept simple for the assignment)
export const FREE_DELIVERY_ABOVE = 500; // free delivery on orders of ₹500 or more
export const DELIVERY_FEE = 40;
export const GST_RATE = 0.05; // 5%

// Works out delivery fee, GST and the final total from the subtotal
export function calculateBill(subtotal) {
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  const gst = Math.round(subtotal * GST_RATE);
  return { delivery, gst, total: subtotal + delivery + gst };
}
