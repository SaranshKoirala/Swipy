import { ObjectId } from 'mongoose';
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Images {
  url: string;
  alt: string;
}

interface Product {
  _id: ObjectId;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImages: Images[];
  productCategory: string;
  quantity?: number;
}

interface UIStore {
  user: User | null;
  cart: Product[];
  favourite: Product[];

  setUser: (user: User | null) => void;
  clearUser: () => void;

  addToCart: (product: Product) => void;
  increaseQuantity: (_id: ObjectId) => void;
  decreaseQuantity: (_id: ObjectId) => void;
  removeFromCart: (_id: ObjectId) => void;
  clearCart: () => void;

  addToFavourite: (product: Product) => void;
  removeFromFavourite: (_id: ObjectId) => void;
  clearFavourite: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  user: null,
  cart: [],
  favourite: [],

  // USER STORE
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  // CART STORE
  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find(
        (item) => String(item._id) === String(product._id)
      );

      if (exists) {
        // Increase quantity
        return {
          cart: state.cart.map((item) =>
            String(item._id) === String(product._id)
              ? { ...item, quantity: (item.quantity ?? 1) + 1 }
              : item
          ),
        };
      }

      // Add new item with quantity: 1
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),

  increaseQuantity: (_id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        String(item._id) === String(_id)
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item
      ),
    })),

  decreaseQuantity: (_id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          String(item._id) === String(_id)
            ? { ...item, quantity: Math.max((item.quantity ?? 1) - 1, 1) }
            : item
        )
        .filter((item) => (item.quantity ?? 1) > 0),
    })),

  removeFromCart: (_id) =>
    set((state) => ({
      cart: state.cart.filter((item) => String(item._id) !== String(_id)),
    })),

  clearCart: () => set({ cart: [] }),

  // FAVOURITE STORE
  addToFavourite: (product) =>
    set((state) => {
      const exists = state.favourite.some(
        (item) => String(item._id) === String(product._id)
      );
      if (exists) return state;

      return { favourite: [...state.favourite, product] };
    }),

  removeFromFavourite: (_id) =>
    set((state) => ({
      favourite: state.favourite.filter(
        (item) => String(item._id) !== String(_id)
      ),
    })),

  clearFavourite: () => set({ favourite: [] }),
}));
