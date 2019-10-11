import React from 'react';
import userImg from '../assets/img/user.svg';
import homeImg from '../assets/img/home.svg';
import { Link } from 'react-router-dom';

function Navbar({ username }) {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={homeImg} alt="home" />
      </Link>
      <h1 className="logo">Ltracker</h1>
      <Link to={`/user/${username}`}>
        <img src={userImg} alt="my profile" />
      </Link>
    </div>
  );
}

export default Navbar;
