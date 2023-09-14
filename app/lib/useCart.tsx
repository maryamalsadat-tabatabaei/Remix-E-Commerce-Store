import { create } from "zustand";
import { ProductId } from "./interface";

interface State {
  cart: ProductId[];
  totalItems: number;
  totalPrice: number;
  qty: number;
  totalQuantities: number;
  showCart: boolean;
}
interface Actions {
  addToCart: (Item: ProductId, Quantity: number) => void;
  removeFromCart: (Item: ProductId) => void;
  changeQuantity: (ItemQty: number) => void;
  toggleShowCart: () => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

export const useCartStore = create<State & Actions>((set, get) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  showCart: false,
  addToCart: (product: ProductId, ProductQuantity: number = 1) => {
    set((state) => {
      const updatedCart = get().cart;
      const cartItemIndex = updatedCart.findIndex(
        (item) => item.slug.current === product.slug.current
      );

      if (cartItemIndex !== -1) {
        updatedCart[cartItemIndex].quantity =
          updatedCart[cartItemIndex].quantity + ProductQuantity;
      } else {
        updatedCart.push({ ...product, quantity: ProductQuantity });
      }

      return {
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price * ProductQuantity,
        totalQuantities: state.totalQuantities + ProductQuantity,
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
      totalQuantities: state.totalQuantities - product.quantity,
    }));
  },
  toggleShowCart: () => set((state) => ({ showCart: !state.showCart })),
  incrementQuantity: () => set((state) => ({ qty: state.qty + 1 })),
  decrementQuantity: () => {
    const prevQty = get().qty;
    if (prevQty - 1 < 1) return 0;
    set((state) => ({ qty: state.qty - 1 }));
  },
  changeQuantity: (ItemQty) => set((state) => ({ qty: state.qty + ItemQty })),
}));
