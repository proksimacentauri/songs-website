import axios from "axios";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { PlayerState, Song } from "../Types/Types";
import Player from "./Player";
import SongItem from "./SongItem";

interface ISongListProps {
    player: PlayerState,
    setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>,
};

const Songlist : FC<ISongListProps> = ({setPlayer, player }) => {
    const [listOfSongs, setSongs] = useState<Song[]>([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        axios.get('http://localhost:5124/api/Songs')
        .then(resp => setSongs(resp.data));
    }, []);


    const onDeleteHandler = (id: string) => {
        axios.delete(import.meta.env.VITE_API_URL + '/api/Songs/' + id)
        .then(resp => setSongs(listOfSongs.filter(song => song.id !== id)));
    };

    return (
        <div className="songlist-container">  
            {listOfSongs.map(song => (<SongItem player={player} onDeleteHandler={onDeleteHandler} setPlayer={setPlayer} key={song.id} song={song} />))} 
        </div>
    );
}


export default Songlist;