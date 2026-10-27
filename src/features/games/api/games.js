import { apiClient } from './client';

export const fetchGames = async (searchQuery = '') => {
    const params = { page_size: 12 };
    if (searchQuery) {
        params.search = searchQuery;
    }
    const response = await apiClient.get('/games', { params });
    return response.data.results;
};


export const saveFavoriteToServer = async (gameId) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, action: 'favorite' })
    });
    if (!response.ok) throw new Error('Ошибка сохранения');
    return response.json();
};

