import { GameCard } from './GameCard';

export function GameList({ games }) {
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