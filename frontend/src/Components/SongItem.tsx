import axios from "axios";
import { FC, SyntheticEvent, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerState, Song } from "../Types/Types";
import './SongItem.css';

interface ISongItemProps {
    song: Song,
    player: PlayerState,
    setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>,
    onDeleteHandler: (id: string) => void;
};

const SongItem : FC<ISongItemProps> = ({song, setPlayer, player, onDeleteHandler }) => {
    const navigate = useNavigate();
    
    const play = (e: SyntheticEvent) => {
        e.stopPropagation();
        setPlayer(prevState => {
            console.log(
                prevState
            )
            return ({ ...player, active: song, pause: true, currentTime: 0 })});
    }

    return (
        <article onClick={play} className="SongItem">
            <section onClick={play}  className="SongItem_titles-container">
                <img className="SongItem__image" src={import.meta.env.VITE_API_URL + "/Images/"+ song.picture}/>
                <div className="SongItem__Section">
                    <p className="SongItem__song-name">{song.name}</p>
                    <p className="SongItem__artist">{song.artistName}</p>
                </div>
            </section>
            <div>
                <button onClick={() => navigate( '/' + song.id + '/edit')}>edit</button>
                <button onClick={() => onDeleteHandler(song.id)}>delete</button>
            </div>
        </article>
    );
}


export default SongItem;