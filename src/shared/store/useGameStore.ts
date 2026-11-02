import { create } from 'zustand';
import type { Game } from '@/features/games/types';


interface GameStore {
    favorites: Game[];
    inFavorite: (game: Game) => void;
}

export const useGameStore = create<GameStore>((set) => ({
    favorites: [],
    inFavorite: (game) => set((state) => {
        const inside = state.favorites.find((g) => g.id === game.id);

        if (inside) {
            return { favorites: state.favorites.filter((g) => g.id !== game.id) };
        }

        return { favorites: [...state.favorites, game] };
    }),
}));