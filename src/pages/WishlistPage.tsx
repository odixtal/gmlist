import { GameList } from '@/features/games/components/GameList';
import { useGameStore } from '@/shared/store/useGameStore';

export function WishlistPage() {
    const { favorites } = useGameStore();

    return (
        <div>
            <h2 className="page-title">Мой Вишлист</h2>
            <GameList games={favorites} />
        </div>
    );
}