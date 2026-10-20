import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: import.meta.env.VITE_RAWG_API_KEY,
    },
});

apiClient.interceptors.request.use((config) => {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
});