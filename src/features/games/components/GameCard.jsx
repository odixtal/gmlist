export function GameCard({ game }) {
    return (
        <div className="game-card">
            <img src={game.background_image} alt={game.name} className="game-image" />
            <div className="game-info">
                <h3 className="game-title">{game.name}</h3>
                <p className="game-rating">Рейтинг: {game.rating}</p>
                <p className="game-date">Дата выхода: {game.released}</p>
            </div>
        </div>
    );
}