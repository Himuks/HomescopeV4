// src/pages/ContactPage.js
import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted (placeholder - no data sent)');
    e.target.reset();
  };

  return (
    <div className="contact-page-container">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you! Send us a message or reach out through our contact details below.</p>
      </div>

      <div className="contact-content-grid">
        {/* Contact Info Section */}
        <section className="contact-info-section">
          <h2>Contact Information</h2>
          <p>Feel free to reach out to us via phone, email, or through Forms.</p>
          <ul className="contact-details-list">
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>VIT Bhopal University, Bhopal - Indore Highway, Kothrikalan, Sehore, Madhya Pradesh - 466114</span>
            </li>
            <li>
              <FaPhoneAlt className="contact-icon" />
              <span>+91 8171565976</span>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <span>anshkhanna2042@gmail.com</span>
            </li>
          </ul>
          {/* Map Placeholder */}
          <div className="map-placeholder">
             <h3>Our Location</h3>
             <div className="map-box">
                {/* --- Your Specific Iframe Code (JSX Adjusted + Title Added) --- */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.5357352578344!2d76.84871217477183!3d23.077476414278042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397ce9ceaaaaaaab%3A0xa224b6b82b421f83!2sVIT%20Bhopal%20University!5e0!3m2!1sen!2sin!4v1744671878974!5m2!1sen!2sin"
                    width="600" // Note: Width is often better controlled by CSS using 100%
                    height="450"// Note: Height is often better controlled by CSS using the aspect-ratio trick
                    style={{ border: 0 }} // Correct JSX style syntax
                    allowFullScreen={true} // Correct JSX boolean attribute syntax
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" // Correct JSX attribute syntax
                    title="Google Map showing VIT Bhopal University location" // Added descriptive title
                >
                </iframe>
                {/* --- End Iframe --- */}
             </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleFormSubmit} className="contact-form">
             {/* ... form fields ... */}
             <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;