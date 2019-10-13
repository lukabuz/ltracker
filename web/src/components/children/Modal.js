import React from 'react';

function Modal({ isActive, question, message, type, action, disableModal }) {
  if (!isActive) return null;

  if (type === 'confirm') {
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

  return (
    <div className="action-modal-container">
      <div className="action-modal">
        <h1>{question}</h1>
        <p>{message}</p>
        <div className="action-modal-buttons">
          <button onClick={disableModal}>Ok</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
