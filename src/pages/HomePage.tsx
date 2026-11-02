import { useOutletContext } from 'react-router-dom';
import { GameList } from '@/features/games/components/GameList';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useGamesQuery } from '@/features/games/hooks/useGamesQuery';
import { AsyncBoundary } from '@/shared/components/AsyncBoundary';
import type { AsyncState } from '@/shared/types/asyncState';
import type { Game } from '@/features/games/types';

interface ContextType {
    search: string;
}

export function HomePage() {

    const { search } = useOutletContext<ContextType>();
    const debouncedSearch = useDebounce(search, 500);


    const { data: games, isLoading, error, refetch } = useGamesQuery(debouncedSearch);


    const state: AsyncState<Game[]> = isLoading
        ? { status: 'loading' }
        : error
            ? { status: 'error', error: error.message }
            : { status: 'success', data: games || [] };


    return (
        <AsyncBoundary
            state={state}
            onRetry={refetch}
            renderSuccess={(gamesData) => <GameList games={gamesData} />}
        />
    );
}