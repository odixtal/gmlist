import { useGameStore } from "@/shared/store/useGameStore";
import { useFavoriteMutation } from "../hooks/useFavoriteMutation";

export function GameCard({ game }) {
    const { inFavorite, favorites } = useGameStore();
    const isFavorite = favorites.some((g) => g.id === game.id);


    const { mutate, isPending, isError } = useFavoriteMutation();

    const handleToggle = () => {
        inFavorite(game);

        if (!isFavorite) {
            mutate(game.id);
        }
    };

    return (
        <div className="game-card">
            <img src={game.background_image} alt={game.name} className="game-image" />
            <div className="game-info">
                <h3 className="game-title">{game.name}</h3>
                <p className="game-rating">Рейтинг: {game.rating}</p>
                <p className="game-date">Дата выхода: {game.released}</p>

                <button
                    className={`pixel-btn ${isFavorite ? 'active' : ''}`}
                    onClick={handleToggle}
                    disabled={isPending}
                >
                    {isPending
                        ? 'Сохранение'
                        : (isFavorite ? 'Удалить' : 'В избранное')}
                </button>

                {isError && <p style={{ color: 'red', fontSize: '8px' }}>Ошибка сервера</p>}
            </div>
        </div>
    );
}