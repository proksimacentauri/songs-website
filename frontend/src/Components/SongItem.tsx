import axios from "axios";
import { FC, SyntheticEvent, useReducer, useState } from "react";
import { PlayerActionTypes, PlayerState, Song } from "../Types/Types";
import './SongItem.css';

interface ISongItemProps {
    song: Song,
    player: PlayerState,
    setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>,
};

const SongItem : FC<ISongItemProps> = ({song, setPlayer, player }) => {

    const play = (e: SyntheticEvent) => {
        e.stopPropagation();
        setPlayer(prevState => {
            console.log(
                prevState
            )
            return ({ ...player, active: song, pause: prevState.pause, currentTime: 0 })});
    }

    return (
        <article onClick={play} className="SongItem">
            <section className="SongItem_titles-container">
                <img className="SongItem__image" src={import.meta.env.VITE_API_URL + "/Images/"+ song.picture}/>
                <div className="SongItem__Section">
                    <p className="SongItem__song-name">{song.name}</p>
                    <p className="SongItem__artist">{song.artistName}</p>
                </div>
            </section>
            <div>
                <button>edit</button>
                <button>delete</button>
            </div>
        </article>
    );
}


export default SongItem;