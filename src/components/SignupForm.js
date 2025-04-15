// src/components/SignupForm.js (or src/components/AuthForms/SignupForm.js)
import React from 'react';
import './AuthForm.css'; // Shared CSS

const SignupForm = ({ onSwitchToLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Add actual signup logic later
    alert('Signup attempt (placeholder)');
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="signup-name">Name</label>
        <input type="text" id="signup-name" required />
      </div>
      <div className="form-group">
        <label htmlFor="signup-email">Email</label>
        <input type="email" id="signup-email" required />
      </div>
      <div className="form-group">
        <label htmlFor="signup-password">Password</label>
        <input type="password" id="signup-password" required />
      </div>
      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
       <p className="switch-form-text">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="link-button">
          Login
        </button>
      </p>
    </form>
  );
};

export default SignupForm;