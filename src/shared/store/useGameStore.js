import { create } from 'zustand';

export const useGameStore = create((set) => ({
    favorites: [],

    inFavorite: (game) => set((state) => {
        const inside = state.favorites.find((g) => g.id === game.id);
        if (inside) {
            return { favorites: state.favorites.filter((g) => g.id !== game.id) };
        }
        return { favorites: [...state.favorites, game] };
    }),
}));