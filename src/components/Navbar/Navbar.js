// src/components/Navbar/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the auth hook
import ThemeToggleButton from '../ThemeToggleButton';
import './Navbar.css';

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const { user, isAuthenticated, logout } = useAuth(); // Use the auth hook
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onLoginClick();
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    onSignupClick();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo"> HomeScope </Link>
        <ul className="navbar-links">
          <li><Link to="/properties">Properties</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="navbar-actions">
          <ThemeToggleButton />
          
          {isAuthenticated ? (
            <>
              <div className="user-info">
                <span className="user-name">Hi, {user.name}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleLoginClick} className="btn btn-secondary">Login</button>
              <button onClick={handleSignupClick} className="btn btn-primary">Sign Up</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;