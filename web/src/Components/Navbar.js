import React from 'react';
import userImg from '../assets/img/user.svg';

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">Ltracker</h1>
      <a href="google.com">
        <img src={userImg} alt="my profile" />
      </a>
    </div>
  );
}

export default Navbar;
