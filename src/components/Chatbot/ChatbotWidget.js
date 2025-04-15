// src/components/Chatbot/ChatbotWidget.js
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatButton from './ChatButton';
import './ChatbotWidget.css'; // Main widget styles

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control chat window visibility

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-widget-container">
      {/* Conditionally render the chat window */}
      {isOpen && <ChatWindow onClose={toggleChatWindow} />}

      {/* Always render the button */}
      <ChatButton onClick={toggleChatWindow} isOpen={isOpen} />
    </div>
  );
};

export default ChatbotWidget;