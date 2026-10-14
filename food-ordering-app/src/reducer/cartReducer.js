// ---------------------------------------------------------------
// cartReducer.js  ->  useReducer concept
//
// A reducer is a plain function:  (currentState, action) => newState
// It never changes the old state; it always returns a NEW array.
//
// The cart state is an array like:
//   [ { id: 1, name: "Pizza", price: 249, emoji: "🍕", quantity: 2 }, ... ]
// ---------------------------------------------------------------

// The starting value of the cart (empty)
export const initialCart = [];

export function cartReducer(state, action) {
  switch (action.type) {
    // ADD_ITEM: add a new item, or increase quantity if it is already in the cart
    case "ADD_ITEM": {
      const item = action.payload;
      const quantityToAdd = action.quantity || 1;
      const existing = state.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        // Item already in cart -> make a new array with updated quantity
        return state.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
            : cartItem
        );
      }
      // New item -> copy old array and add the new item at the end
      return [
        ...state,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          quantity: quantityToAdd,
        },
      ];
    }

    // REMOVE_ITEM: delete the item completely from the cart
    case "REMOVE_ITEM":
      return state.filter((cartItem) => cartItem.id !== action.id);

    // CHANGE_QUANTITY: add or subtract from the quantity (change is +1 or -1)
    case "CHANGE_QUANTITY":
      return state
        .map((cartItem) =>
          cartItem.id === action.id
            ? { ...cartItem, quantity: cartItem.quantity + action.change }
            : cartItem
        )
        // If quantity drops to 0, remove the item from the cart
        .filter((cartItem) => cartItem.quantity > 0);

    // CLEAR_CART: empty the cart (used after placing an order)
    case "CLEAR_CART":
      return initialCart;

    // Unknown action: return the state unchanged
    default:
      return state;
  }
}
