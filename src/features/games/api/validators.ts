import type { Game } from '../types';


export function isGame(data: unknown): data is Game {
    if (typeof data !== 'object' || data === null) {
        return false;
    }

    const obj = data as Record<string, unknown>;

    return (
        typeof obj.id === 'number' &&
        typeof obj.name === 'string' &&
        (typeof obj.background_image === 'string' || obj.background_image === null) &&
        typeof obj.rating === 'number' &&
        typeof obj.released === 'string'
    );
}

export function isGameArray(data: unknown): data is Game[] {
    return Array.isArray(data) && data.every(isGame);
}