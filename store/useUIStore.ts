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
}

interface UIStore {
  user: User | null;
  cart: Product[];
  favourite: Product[];
  setUser: (user: User) => void;
  clearUser: () => void;
  addToCart: (product: Product) => void;
  addToFavourite: (product: Product) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  user: null,
  cart: [],
  favourite: [],

  //user store
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  //product store
  addToCart: (product) => {
    set((state) => {
      const exists = state.cart.some((item) => item._id === product._id);
      if (exists) return state;
      return {
        cart: [...state.cart, product],
      };
    });
  },

  addToFavourite: (product) => {
    set((state) => {
      const exists = state.favourite.some((item) => item._id === product._id);
      if (exists) return state;
      return {
        favourite: [...state.favourite, product],
      };
    });
  },
}));
