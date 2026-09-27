import { create } from 'zustand';
import type { Product } from '../types/product';

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (product: Product) => {
    const { favorites } = get();
    if (!favorites.find((p) => p.id === product.id)) {
      set({ favorites: [...favorites, product] });
    }
  },

  removeFavorite: (productId: string) => {
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== productId),
    }));
  },

  isFavorite: (productId: string) => {
    return get().favorites.some((p) => p.id === productId);
  },
}));
