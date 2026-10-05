export const initialCartState = { items: [] };

export const CART_ACTIONS = {
  ADD: "cart/add",
  DECREASE: "cart/decrease",
  REMOVE: "cart/remove",
  CLEAR: "cart/clear",
};

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const product = action.payload;
      if (product.stock <= 0) return state;

      const existing = state.items.find((item) => item.id === product.id);
      if (!existing) {
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }
      if (existing.quantity >= product.stock) return state;

      return {
        items: state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }

    case CART_ACTIONS.DECREASE: {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (!item) return state;
      if (item.quantity === 1) {
        return {
          items: state.items.filter((entry) => entry.id !== action.payload),
        };
      }
      return {
        items: state.items.map((entry) =>
          entry.id === action.payload
            ? { ...entry, quantity: entry.quantity - 1 }
            : entry,
        ),
      };
    }

    case CART_ACTIONS.REMOVE:
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case CART_ACTIONS.CLEAR:
      return initialCartState;

    default:
      return state;
  }
}

export function getCartCount(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items) {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

export function getShippingFee(subtotal) {
  if (subtotal === 0 || subtotal >= 500000) return 0;
  return 30000;
}
