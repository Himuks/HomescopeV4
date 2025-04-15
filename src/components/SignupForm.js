// src/components/SignupForm.js (or src/components/AuthForms/SignupForm.js)
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the auth hook
import './AuthForm.css'; // Shared CSS

const SignupForm = ({ onSwitchToLogin, onSuccess }) => {
  const { signup, isLoading, authError } = useAuth(); // Use the auth hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id.replace('signup-', '')]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setValidationError('Please fill in all fields');
      return;
    }
    
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    
    // Call the signup function from AuthContext
    signup(formData);
    
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
        <label htmlFor="signup-name">Full Name</label>
        <input 
          type="text" 
          id="signup-name" 
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-email">Email</label>
        <input 
          type="email" 
          id="signup-email" 
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-password">Password</label>
        <input 
          type="password" 
          id="signup-password" 
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="signup-confirmPassword">Confirm Password</label>
        <input 
          type="password" 
          id="signup-confirmPassword" 
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
          required 
        />
      </div>
      <button 
        type="submit" 
        className="btn btn-primary btn-block"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </button>
      <p className="switch-form-text">
        Already have an account?{' '}
        <button 
          type="button" 
          onClick={onSwitchToLogin} 
          className="link-button"
          disabled={isLoading}
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default SignupForm;