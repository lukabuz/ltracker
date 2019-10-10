import React from 'react';

function Lighter(props) {
  return (
    <div className="lighter">
      <div className="lighter-header">
        <span className="lighter-color"></span>
        <p className="lighter-id">#123</p>
        <div className="push-left"></div>
        <p className="lighter-owner">
          owned by <a href="google">luka buzaladze</a>
        </p>
      </div>
      <div className="lighter-description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="lighter-buttons">
        <button className="red">report missing</button>
        <button className="green">claim</button>
      </div>
    </div>
  );
}

export default Lighter;
