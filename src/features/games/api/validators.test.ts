import { isGame, isGameArray } from './validators';
import type { Game } from '../types';

const mockGame: Game = {
    id: 1,
    name: 'The Witcher 3',
    background_image: 'url',
    rating: 4.9,
    released: '2015-05-18'
};

describe('Валидаторы API', () => {
    test('isGame возвращает true для правильного объекта', () => {
        expect(isGame(mockGame)).toBe(true);
    });

    test('isGame возвращает false для пустого объекта', () => {
        expect(isGame({})).toBe(false);
    });

    test('isGameArray возвращает false, если передан не массив', () => {
        expect(isGameArray("строка")).toBe(false);
    });
});