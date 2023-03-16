
import { FC } from "react";
import { Link } from "react-router-dom";
import "./Header.css";



const Header : FC = () => {
    return (
        <header className="header">
        <nav className="nav-links">  <Link to={'/'}>Home</Link> </nav>
        <button className="button"><Link to={'/AddSong'}>add song</Link></button>
        </header>
    );
}


export default Header;