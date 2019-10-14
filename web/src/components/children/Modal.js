import React from 'react';

function Modal({ isActive, title, messages, type, action, disableModal }) {
  if (!isActive) return null;

  const buttons =
    type === 'confirm' ? (
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
    ) : (
      <div className="action-modal-buttons">
        <button onClick={disableModal}>Ok</button>
      </div>
    );

  messages = messages.map((message, index) => <p key={index}>{message}</p>);

  return (
    <div className="action-modal-container">
      <div className="action-modal">
        <h1>{title}</h1>
        {messages}
        {buttons}
      </div>
    </div>
  );
}

export default Modal;
