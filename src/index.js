// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext'; // <-- Import ThemeProvider
import { AuthProvider } from './context/AuthContext'; // <-- Import AuthProvider
import './index.css'; // Ensure global styles are imported
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider> {/* <-- Wrap App with ThemeProvider */}
        <AuthProvider> {/* <-- Wrap App with AuthProvider */}
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();