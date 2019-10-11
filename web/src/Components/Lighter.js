import React from 'react';

function Lighter({ claim, report, username, data }) {
  return (
    <div className="lighter">
      <div className="lighter-header">
        <span className="lighter-color" style={{ backgroundColor: data.color }}></span>
        <p className="lighter-id">
          <span color={{ backgroundColor: data.color }}>{data.color.toLowerCase()}</span> #
          {data.number}
        </p>
        <div className="push-left"></div>
        <p className="lighter-owner">
          owned by{' '}
          <a href="google">{username === data.current_owner ? 'You' : data.current_owner}</a>
        </p>
      </div>
      <div className="lighter-description">
        <p>{data.description}</p>
      </div>
      <div className="lighter-buttons">
        <button className="red" name={data.number} onClick={report}>
          report missing
        </button>
        {username === data.current_owner ? null : (
          <button className="green" name={data.number} onClick={claim}>
            claim
          </button>
        )}
      </div>
    </div>
  );
}

export default Lighter;
