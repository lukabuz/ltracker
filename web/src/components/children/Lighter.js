import React from 'react';
import nl2br from 'react-nl2br';
import { Link } from 'react-router-dom';

function Lighter({ claim, report, username, data, lost = false }) {
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
          <Link to={`/user/${data.current_owner}`}>
            {username === data.current_owner ? 'You' : data.current_owner}
          </Link>
        </p>
      </div>
      <div className="lighter-description">
        <p>{nl2br(data.description)}</p>
      </div>
      {!lost ? (
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
      ) : null}
    </div>
  );
}

export default Lighter;
