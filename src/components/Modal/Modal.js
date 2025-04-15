// src/components/Modal/Modal.js
import React from 'react';
import './Modal.css';
import { FaTimes } from 'react-icons/fa'; // Import close icon

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null; // Don't render anything if the modal is not shown
  }

  // Prevent clicks inside the modal content from closing it
  const handleContentClick = (e) => {
      e.stopPropagation();
  };

  return (
    // The modal backdrop (semi-transparent background)
    <div className="modal-backdrop" onClick={onClose}>
      {/* The modal content area */}
      <div className="modal-content" onClick={handleContentClick}>
        {/* Modal Header */}
        <div className="modal-header">
          <h4 className="modal-title">{title || 'Modal Title'}</h4>
          <button onClick={onClose} className="modal-close-button">
            <FaTimes /> {/* Close icon */}
          </button>
        </div>
        {/* Modal Body (where content passed as children goes) */}
        <div className="modal-body">
          {children}
        </div>
        {/* Modal Footer (optional, can be added via children if needed) */}
        {/* <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;