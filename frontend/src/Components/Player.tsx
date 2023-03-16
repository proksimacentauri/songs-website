import React, {FC, useEffect, useReducer} from 'react';
import { PlayerActionTypes, PlayerState } from '../Types/Types';
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import SongProgress from './SongProgress';
import './player.css';


interface IPlayerProps {
    player: PlayerState,
    setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>
};

let audio: HTMLAudioElement;

const Player : FC<IPlayerProps> = ({player, setPlayer}) => {
    const {pause, volume, active, duration, currentTime} = player;

    useEffect(() => {
        if(!audio) {
            audio = new Audio();
        } else {
            console.log(currentTime);
            setAudio();
            play();
        }
     }, [active]);

     useEffect(() => {
        if (currentTime == 0) {
            audio.currentTime = 0;
        }
     }, [currentTime]);

     const setAudio = () => {
         if (active != null) {
             audio.src = import.meta.env.VITE_API_URL + "/Audios/" + active?.audio;
             audio.currentTime = currentTime;
             audio.volume = volume / 100;
             audio.onloadedmetadata = () => {
                setPlayer(prevState => ({ 
                    ...prevState, 
                    duration: Math.ceil(audio.duration)
                }));
             }
             audio.ontimeupdate = () => {
                setPlayer(prevState => ({...prevState, currentTime: Math.ceil(audio.currentTime)}));
             }
         }
     }

    const play = () => {
        if (pause) {
            audio.play();
        
            setPlayer(prevState => ({ ...prevState, pause: false }))
        } else {
            setPlayer(prevState => ({ ...prevState, pause: true }))
            audio.pause();
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value)/100;
        setPlayer(prevState => ({ ...prevState, volume: Number(e.target.value)}));
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setPlayer(prevState => ({...prevState, currentTime: Number(e.target.value)}));
    }
    return (
        <div className="player">        
            <div className="player__settings">
                <button className="player__button" onClick={play}>{pause ? <PlayArrow /> : <Pause/>}</button>
                <div className="player__song-headings">
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artistName}</div>
                </div>
            </div>
                <SongProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
                <div className="player__settings">
                <VolumeUp />
                <input type="range" min={0} max={100} value={volume} onChange={(e) => changeVolume(e)} />
                </div>
        </div>
    );
};

export default Player;