import { useState, useEffect, useCallback } from 'react';
import { fetchGames } from '../api/games';

export function useGames(searchQuery) {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(0);

    const reload = useCallback(() => {
        setTrigger((prev) => prev + 1);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchGames(searchQuery);
                if (isMounted) {
                    setGames(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Не удалось загрузить игры. Проверьте соединение.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [searchQuery, trigger]);

    return { games, isLoading, error, reload };
}