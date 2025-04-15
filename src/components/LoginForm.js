// src/components/LoginForm.js (or src/components/AuthForms/LoginForm.js)
import React from 'react';
import './AuthForm.css'; // Shared CSS for forms

const LoginForm = ({ onSwitchToSignup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Add actual login logic later
    alert('Login attempt (placeholder)');
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input type="email" id="login-email" required />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input type="password" id="login-password" required />
      </div>
      <button type="submit" className="btn btn-primary btn-block">Login</button>
      <p className="switch-form-text">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitchToSignup} className="link-button">
          Sign Up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;