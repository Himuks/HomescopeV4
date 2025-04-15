// src/components/LoginForm.js (or src/components/AuthForms/LoginForm.js)
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the auth hook
import './AuthForm.css'; // Shared CSS for forms

const LoginForm = ({ onSwitchToSignup, onSuccess }) => {
  const { login, isLoading, authError } = useAuth(); // Use the auth hook
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id.replace('login-', '')]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setValidationError('Please fill in all fields');
      return;
    }
    
    // Call the login function from AuthContext
    login(formData);
    
    // Close the modal if success callback provided and no errors
    if (!authError && onSuccess) {
      // We'll let the AuthContext handle this via useEffect
      setTimeout(() => {
        if (!authError) onSuccess();
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {(validationError || authError) && (
        <div className="error-message">
          {validationError || authError}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input 
          type="email" 
          id="login-email" 
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <input 
          type="password" 
          id="login-password" 
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          required 
        />
      </div>
      <div className="form-group form-checkbox">
        <input 
          type="checkbox" 
          id="login-rememberMe" 
          checked={formData.rememberMe}
          onChange={handleChange}
          disabled={isLoading}
        />
        <label htmlFor="login-rememberMe" className="checkbox-label">Remember me</label>
      </div>
      <button 
        type="submit" 
        className="btn btn-primary btn-block"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <p className="switch-form-text">
        Don't have an account?{' '}
        <button 
          type="button" 
          onClick={onSwitchToSignup} 
          className="link-button"
          disabled={isLoading}
        >
          Sign Up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;