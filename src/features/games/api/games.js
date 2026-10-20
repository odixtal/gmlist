import { apiClient } from './client';

export const fetchGames = async (searchQuery = '') => {
    const params = { page_size: 12 };

    if (searchQuery) {
        params.search = searchQuery;
    }

    const response = await apiClient.get('/games', { params });
    return response.data.results;
};