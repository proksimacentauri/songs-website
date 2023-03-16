import React from 'react';
import './Player.css';

interface SongProgressProps {
    left: number;
    right: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormatTime(duration: number) {
    const mins = Math.round((duration % 3600) / 60);
    const secs = Math.round(duration % 60);
  
    let result = "";
  
    result += "" + mins + ":" + (secs < 10 ? "0" : "");
    result += "" + secs;
  
    return result;
  }

const TrackProgress: React.FC<SongProgressProps> = ({left, right, onChange}) => {

    //fancyTimeFormat(left)
    return (
        <div className="song-progress">
            <div>{FormatTime(left)}</div>
            <input
                className="song-progress__input"
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{FormatTime(right)}</div>
        </div>
    );
};

export default TrackProgress;