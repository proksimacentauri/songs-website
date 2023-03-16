export type Song = {
    artistName: string,
    name: string,
    id: string,
    picture: string,
    audio: string
};

export interface PlayerState {
    active: null | Song;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
}
