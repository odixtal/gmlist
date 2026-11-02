import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveFavoriteToServer } from '../api/games';

export function useFavoriteMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveFavoriteToServer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['games'] });
        },
    });
}