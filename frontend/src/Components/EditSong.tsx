import React, {SyntheticEvent, useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import axios from "axios";
import UploadFile from './UploadFile';
import './CreateSong.css'
import { useNavigate, useParams  } from 'react-router-dom';

const EditSong = () => {
    const [stateFormData, setFormData] = useState ({
        name: '',
        artistName: '',
    });
    const [picture, setPicture] = useState('');
    const [audio, setAudio] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const submitHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('Name', stateFormData.name);
        formData.append('ArtistName', stateFormData.artistName);
        formData.append('Picture', picture);
        formData.append('Audio', audio);
        console.log(id);
        axios.put( import.meta.env.VITE_API_URL  + '/api/Songs/' + id, formData)
            .then(res => navigate('/'))
            .catch(e => setError(e.message))
    }
    
    const handleChangeHandler = (event: SyntheticEvent) => {
        const handleChangeElement = event.target as HTMLSelectElement;
        setFormData(prevState => ({
          ...prevState,
          [handleChangeElement.name]: handleChangeElement.value,
        }));
    };
    
    return (
        <form className="create-song" onSubmit={submitHandler}>
            <h3>Edit Song</h3>
            <input
                placeholder="name of song"
                type="text"
                name="name"
                onChange={handleChangeHandler}
            />
            <input
                placeholder="name of artist"
                type="text"
                name="artistName"
                onChange={handleChangeHandler}
            />
            <UploadFile accept="audio/*" setFile={setAudio}>
                <button type="button">Add Audio</button>
            </UploadFile>
            <UploadFile accept="image/*" setFile={setPicture}>
                <button type="button">Add Picture</button>
            </UploadFile>
            {error}
            <button type="submit">edit song</button>
        </form>
    );
};

export default EditSong;