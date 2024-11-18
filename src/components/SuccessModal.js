import React, { useEffect } from 'react';
// import './SuccessModal.css';

const SuccessModal = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('success-modal').style.display = 'none';
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-modal-overlay" id="success-modal">
      <div className="success-modal">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal;
