import { create } from "zustand";
import toast from "react-hot-toast";
import { ProductId, Product } from "./interface";

interface State {
  cart: ProductId[];
  wishList: Product[];
  totalItems: number;
  totalPrice: number;
  totalWish: number;
  qty: number;
  totalQuantities: number;
  showCart: boolean;
}
interface Actions {
  addToCart: (Item: ProductId, Quantity: number) => void;
  removeFromCart: (Item: ProductId) => void;
  changeQuantity: (Item: ProductId, action: string) => void;
  toggleShowCart: () => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  wishListHandler: (Item: Product) => void;
  isProductInWishlist: (Item: Product) => boolean;
}

export const useCartStore = create<State & Actions>((set, get) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  totalQuantities: 0,
  totalWish: 0,
  qty: 1,
  wishList: [],
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
  isProductInWishlist(product: Product) {
    const wishListItems = get().wishList;
    const productItem = wishListItems.find(
      (item) => item.slug.current === product.slug.current
    );
    return productItem ? true : false;
  },
  wishListHandler: (product: Product) => {
    const wishListItems = get().wishList;
    const wishListItem = wishListItems.find(
      (item) => item.slug.current === product.slug.current
    );
    if (wishListItem) {
      const updateWishListItems = wishListItems.filter(
        (item) => item.slug.current === product.slug.current
      );
      set((state) => ({
        wishList: updateWishListItems,
        totalWish: state.totalWish - 1,
      }));
    } else {
      wishListItems.push({ ...product });
      set((state) => ({
        wishList: wishListItems,
        totalWish: state.totalWish + 1,
      }));
    }
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
  changeQuantity: (product: ProductId, action: string) => {
    const updatedCart = get().cart;
    const cartItemIndex = updatedCart.findIndex(
      (item) => item.slug.current === product.slug.current
    );

    if (action === "inc") {
      updatedCart[cartItemIndex].quantity =
        updatedCart[cartItemIndex].quantity + 1;
      set((state) => ({
        totalPrice: state.totalPrice + product.price,
        totalQuantities: state.totalQuantities + 1,
      }));
    } else if (action === "dec") {
      if (product.quantity > 1) {
        updatedCart[cartItemIndex].quantity =
          updatedCart[cartItemIndex].quantity - 1;
        set((state) => ({
          totalPrice: state.totalPrice - product.price,
          totalQuantities: state.totalQuantities - 1,
        }));
      }
    }
  },
}));
