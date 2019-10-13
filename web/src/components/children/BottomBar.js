import React from 'react';
import { Link } from 'react-router-dom';

import plusImg from '../../assets/img/plus-square.svg';

function Navbar() {
  return (
    <>
      <div className="bottom-padded"></div>
      <div className="bottombar">
        <Link to="/add-lighter">
          <img src={plusImg} alt="add lighter" />
        </Link>
      </div>
    </>
  );
}

export default Navbar;
