// src/components/Chatbot/ChatButton.js
import React from 'react';
import { FaComments, FaTimes } from 'react-icons/fa'; // Icons
import './ChatButton.css';

const ChatButton = ({ onClick, isOpen }) => {
  return (
    <button className="chat-button" onClick={onClick} aria-label={isOpen ? 'Close Chat' : 'Open Chat'}>
      {isOpen ? <FaTimes /> : <FaComments />} {/* Show close or chat icon */}
    </button>
  );
};

export default ChatButton;