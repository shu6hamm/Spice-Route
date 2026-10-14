// ---------------------------------------------------------------
// CartContext.jsx
// Context lets us share the cart with ANY component without passing
// it through props at every level (Navbar, Cart page, Checkout...).
// The cart itself is managed with useReducer.
// ---------------------------------------------------------------
import { createContext, useContext, useReducer } from "react";
import { cartReducer, initialCart } from "../reducer/cartReducer.js";

// 1. Create the context object
const CartContext = createContext();

// 2. Provider component: wraps the app and supplies the cart values
export function CartProvider({ children }) {
  // useReducer returns the current state and a dispatch function.
  // dispatch({ type: "ADD_ITEM", ... }) sends an action to the reducer.
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Values calculated from the cart (derived data)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom hook so components can write  const { cart } = useCart();
export function useCart() {
  return useContext(CartContext);
}
