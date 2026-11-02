export interface Game {
    id: number;
    name: string;
    background_image: string | null;
    rating: number;
    released: string;
}


export type GamePreview = Pick<Game, 'id' | 'name' | 'background_image'>;


export type CreateGameDto = Omit<Game, 'id'>;


export type GamesRecord = Record<number, Game>;


export interface ApiError {
    message: string;
    status?: number;
}