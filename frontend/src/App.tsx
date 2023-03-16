import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Songlist from './Components/Songlist';
import Player from './Components/Player';
import { PlayerState } from './Types/Types';
import CreateSong from './Components/CreateSong';
import EditSong from './Components/EditSong';
import Header from './Components/Header';


function App() {
  const [player, setPlayer] = useState<PlayerState>({
    currentTime: 0,
    duration: 0,
    active:  null,
    volume: 50,
    pause: true,
  });

  useEffect(() => {
    axios.get('http://localhost:5124/api/Songs')
    .then(resp => console.log(resp));
  }, []);



  return (
    <>
     <Header />
    <Routes>
      <Route index element={<Songlist player={player} setPlayer={setPlayer}  />} />
      <Route path="/Addsong" element={<CreateSong />} />
      <Route path="/:id/edit" element={<EditSong />} />
      <Route path="*" element={<div>page not found</div>} />
    </Routes>
    <Player player={player} setPlayer={setPlayer} />
    </>
  )
}

export default App;
