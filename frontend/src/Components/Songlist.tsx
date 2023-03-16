import axios from "axios";
import { FC, useEffect, useState } from "react";
import { PlayerState, Song } from "../Types/Types";
import Player from "./Player";
import SongItem from "./SongItem";
import './Songlist.css';

interface ISongListProps {
    player: PlayerState,
    setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>,
};

const Songlist : FC<ISongListProps> = ({setPlayer, player }) => {
    const [listOfSongs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5124/api/Songs')
        .then(resp => setSongs(resp.data));
    }, []);

    return (
        <div className="songlist-container">
            {listOfSongs.map(song => (<SongItem player={player}  setPlayer={setPlayer} key={song.id} song={song} />))} 
        </div>
    );
}


export default Songlist;