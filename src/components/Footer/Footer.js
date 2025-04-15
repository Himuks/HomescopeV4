// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';

// Receive onCalcClick prop
const Footer = ({ onCalcClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>HomeScope</h4>
          <p>Find your next home with us.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Properties</a></li> {/* Consider changing to Link from react-router-dom later */}
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            {/* Add Calculator Link/Button */}
            <li>
                <button onClick={onCalcClick} className="link-button footer-link-button">
                    Mortgage Calculator
                </button>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <p>contact@homescope.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {currentYear} HomeScope Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;