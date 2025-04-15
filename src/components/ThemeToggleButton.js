// src/components/ThemeToggleButton.js
import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import the custom hook
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons
import './ThemeToggleButton.css'; // We'll create this

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme(); // Get theme state and toggle function

  return (
    <button
      className="theme-toggle-button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />} {/* Show opposite icon */}
    </button>
  );
};

export default ThemeToggleButton;