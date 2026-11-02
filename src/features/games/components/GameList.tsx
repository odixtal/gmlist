import { GameCard } from './GameCard';
import type { Game } from '../types';

interface GameListProps {
    games: Game[];
}

export function GameList({ games }: GameListProps) {
    if (games.length === 0) {
        return <p className="empty-message">Игры не найдены</p>;
    }

    return (
        <div className="games-grid">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
}