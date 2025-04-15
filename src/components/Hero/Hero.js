// src/components/Hero/Hero.js
import React, { useState } from 'react'; // <-- Import useState
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import './Hero.css';
import heroBgImage from '../../assets/images/hero-background.jpg';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState(''); // <-- Add state for query
  const navigate = useNavigate(); // <-- Get navigate function

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBgImage})`
  };

  // --- Handler for input change ---
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // --- Handler for form submission ---
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      // Navigate to properties page with search query as URL parameter
      // We encode the query to handle spaces and special characters
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      // Optional: Navigate without query if input is empty, or show a message
      navigate('/properties');
    }
  };

  return (
    <section className="hero-section" style={heroStyle}>
      <div className="hero-content">
        <h1 className="hero-title">Find Your Dream Home</h1>
        <p className="hero-subtitle">Search properties for sale and rent in your area.</p>

        {/* --- Wrap input and button in a form --- */}
        <form className="hero-search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="hero-search-input"
            placeholder="Enter address or city..."
            value={searchQuery} // <-- Bind value to state
            onChange={handleInputChange} // <-- Set onChange handler
          />
          {/* Change button type to submit */}
          <button type="submit" className="hero-search-button">Search</button>
        </form>
        {/* --- End Form --- */}

      </div>
    </section>
  );
};

export default Hero;