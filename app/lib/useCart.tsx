import { create } from "zustand";
import { ProductId } from "./interface";

interface State {
  cart: ProductId[];
  totalItems: number;
  totalPrice: number;
  showCart: boolean;
}
interface Actions {
  addToCart: (Item: ProductId) => void;
  removeFromCart: (Item: ProductId) => void;
  toggleShowCart: () => void;
}

export const useCartStore = create<State & Actions>((set, get) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  showCart: false,
  addToCart: (product: ProductId) => {
    set((state) => {
      const updatedCart = get().cart;
      const cartItemIndex = updatedCart.findIndex(
        (item) => item.slug.current === product.slug.current
      );

      if (cartItemIndex !== -1) {
        updatedCart[cartItemIndex].quantity =
          (updatedCart[cartItemIndex].quantity || 0) + 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      return {
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      };
    });
  },

  removeFromCart: (product: ProductId) => {
    set((state) => ({
      cart: state.cart.filter(
        (item) => item.slug.current !== product.slug.current
      ),
      totalItems: state.totalItems - 1,
      totalPrice: state.totalPrice - product.price,
    }));
  },
  toggleShowCart: () => set((state) => ({ showCart: !state.showCart })),
}));
