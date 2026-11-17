import { fetchGames } from './games';
import { apiClient } from './client';
import { vi } from 'vitest';

vi.mock('./client', () => ({
    apiClient: {
        get: vi.fn()
    }
}));

describe('Функция fetchGames', () => {
    test('возвращает массив игр при успешном запросе', async () => {
        const mockResponse = {
            data: {
                results: [
                    { id: 1, name: 'Game 1', background_image: null, rating: 5, released: '2023' }
                ]
            }
        };

        (apiClient.get as any).mockResolvedValueOnce(mockResponse);
        const games = await fetchGames('witcher');

        expect(games).toHaveLength(1);
        expect(games[0]?.name).toBe('Game 1');
    });

    test('выбрасывает ошибку при неверном формате данных', async () => {
        (apiClient.get as any).mockResolvedValueOnce({ data: { bad: 'format' } });
        await expect(fetchGames('witcher')).rejects.toThrow('Некорректный формат данных от API');
    });
});