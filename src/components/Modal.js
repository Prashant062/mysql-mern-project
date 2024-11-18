import React from 'react';
// import './Modal.css';

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-btn yes" onClick={onConfirm}>Yes</button>
          <button className="modal-btn no" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
