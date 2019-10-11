import React from 'react';

function Modal({ isActive, question, message, action, disableModal }) {
  if (!isActive) return null;

  return (
    <div className="action-modal-container">
      <div className="action-modal">
        <h1>{question}</h1>
        <p>{message}</p>
        <div className="action-modal-buttons">
          <button onClick={disableModal} className="btn-no">
            No
          </button>
          <button
            onClick={() => {
              action();
              disableModal();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
