// src/components/Navbar/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggleButton from '../ThemeToggleButton'; // <-- Import Toggle Button
import './Navbar.css';

const Navbar = ({ onLoginClick, onSignupClick /*, favoriteCount */ }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo"> HomeScope </Link>
        <ul className="navbar-links">
          {/* ... links ... */}
          <li><Link to="/properties">Properties</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="navbar-actions">
           <ThemeToggleButton /> {/* <-- Add Theme Toggle Button Here */}
           <button onClick={onLoginClick} className="btn btn-secondary">Login</button>
           <button onClick={onSignupClick} className="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;