import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Songlist from './Components/Songlist';
import Player from './Components/Player';
import { PlayerState } from './Types/Types';
import AddSong from './Components/AddSong';


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
    <header>\
      <Link to={'/'}>Home</Link>
      <input type="text" />      
      <button><Link to={'/AddSong'}>add song</Link></button>
    </header>
    <Routes>
      <Route index element={<Songlist player={player} setPlayer={setPlayer}  />} />
      <Route path="/Addsong" element={<AddSong />} />
      <Route path="*" element={<div>page not found</div>} />
    </Routes>
    <Player player={player} setPlayer={setPlayer} />
    </>
  )
}

export default App;
