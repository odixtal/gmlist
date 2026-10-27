import { useOutletContext } from 'react-router-dom';
import { GameList } from '@/features/games/components/GameList';
import { Spinner } from '@/shared/components/Spinner';
import { Button } from '@/shared/components/Button';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useGamesQuery } from '@/features/games/hooks/useGamesQuery';

export function HomePage() {
    const { search } = useOutletContext();
    const debouncedSearch = useDebounce(search, 500);

    const { data: games, isLoading, error, refetch } = useGamesQuery(debouncedSearch);

    if (isLoading) return <Spinner />;

    if (error) {
        return (
            <div className="error-container">
                <p>Ошибка при загрузке: {error.message}</p>
                <Button onClick={() => refetch()}>Повторить</Button>
            </div>
        );
    }

    return <GameList games={games || []} />;
}