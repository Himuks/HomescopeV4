// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Key for local storage
const THEME_STORAGE_KEY = 'homeScopeTheme';

// Create the context
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme ('light' or 'dark')
  // Initialize state from local storage or default to 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      // Add check for system preference if no stored theme (optional)
      // const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return storedTheme ? storedTheme : 'light'; // Default to light
    } catch (error) {
      console.error("Error reading theme from local storage", error);
      return 'light';
    }
  });

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      try {
         localStorage.setItem(THEME_STORAGE_KEY, newTheme); // Save new theme
      } catch (error) {
         console.error("Error saving theme to local storage", error);
      }
      return newTheme;
    });
  };

  // Effect to apply the theme class/attribute to the body or root element
  useEffect(() => {
    const rootElement = window.document.documentElement; // Get the <html> element
    rootElement.setAttribute('data-theme', theme); // Set data-theme="light" or data-theme="dark"
    // Alternatively, you could add/remove a class:
    // rootElement.classList.remove('light-theme', 'dark-theme');
    // rootElement.classList.add(`${theme}-theme`);
  }, [theme]); // Run this effect whenever the theme changes

  // Provide the theme state and toggle function to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily consume the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};