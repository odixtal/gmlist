import { apiClient } from './client';
import { isGameArray } from './validators';
import type { Game } from '../types';


export const fetchGames = async (searchQuery = ''): Promise<Game[]> => {
    const params: { page_size: number; search?: string } = { page_size: 12 };
    if (searchQuery) {
        params.search = searchQuery;
    }

    const response = await apiClient.get('/games', { params });


    const data: unknown = response.data;


    if (
        typeof data === 'object' &&
        data !== null &&
        'results' in data &&
        isGameArray(data.results)
    ) {
        return data.results;
    }

    throw new Error('Некорректный формат данных от API');
};

export const saveFavoriteToServer = async (gameId: number): Promise<{ success: boolean }> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, action: 'favorite' })
    });

    if (!response.ok) {
        throw new Error('Ошибка сохранения');
    }

    return response.json() as Promise<{ success: boolean }>;
};