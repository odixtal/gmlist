import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../api/games';
import type { Game } from '../types';

export function useGamesQuery(searchQuery: string) {
  return useQuery<Game[], Error>({
    queryKey: ['games', searchQuery],
    queryFn: () => fetchGames(searchQuery),
  });
}