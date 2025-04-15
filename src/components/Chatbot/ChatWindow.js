// src/components/Chatbot/ChatWindow.js
import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa'; // Icons
import './ChatWindow.css';

// --- Very Basic Bot Logic ---
const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        return "Hello there! How can I help you find a property today?";
    } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        return "Property prices vary widely. You can filter by price on our Properties page!";
    } else if (lowerInput.includes('location') || lowerInput.includes('area')) {
        return "We have properties in many locations. What area are you interested in?";
    } else if (lowerInput.includes('bedrooms') || lowerInput.includes('beds')) {
        return "You can filter properties by the number of bedrooms on the Properties page.";
    } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
        return "You can find our contact details on the Contact Us page.";
    } else if (lowerInput.includes('bye') || lowerInput.includes('thanks')) {
        return "You're welcome! Feel free to ask if you have more questions. Goodbye!";
    } else {
        return "Sorry, I'm just a simple bot. I couldn't understand that. Try asking about price, location, or bedrooms.";
    }
};
// --- End Bot Logic ---


const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
      // Initial bot message
      { id: Date.now(), sender: 'bot', text: 'Welcome to HomeScope! How can I assist you?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null); // Ref to scroll to bottom

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent form submission page reload
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return; // Don't send empty messages

    // Add user message to state
    const userMessage = { id: Date.now(), sender: 'user', text: trimmedInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Get and add bot response after a short delay
    setTimeout(() => {
        const botResponseText = getBotResponse(trimmedInput);
        const botMessage = { id: Date.now() + 1, sender: 'bot', text: botResponseText };
        setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 500); // Simulate bot thinking time


    setInputValue(''); // Clear the input field
  };


  return (
    <div className="chat-window">
      <div className="chat-header">
        <h4>HomeScope Helper</h4>
        <button onClick={onClose} className="chat-close-button" aria-label="Close Chat">
          <FaTimes />
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message message-${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {/* Empty div to mark the end of messages for scrolling */}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          aria-label="Chat input"
        />
        <button type="submit" aria-label="Send Message">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;