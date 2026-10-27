import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../api/games';

export function useGamesQuery(searchQuery) {
    return useQuery({
        queryKey: ['games', searchQuery],
        queryFn: () => fetchGames(searchQuery),
    });
}