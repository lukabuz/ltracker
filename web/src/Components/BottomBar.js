import React from 'react';
import plusImg from '../assets/img/plus-square.svg';

function Navbar() {
  return (
    <div className="bottombar">
      <a href="google.com">
        <img src={plusImg} alt="add lighter" />
      </a>
    </div>
  );
}

export default Navbar;
