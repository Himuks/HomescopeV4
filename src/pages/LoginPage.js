import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import './LoginPage.css';

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the path to redirect to after login (if any)
  const from = location.state?.from || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  const handleSuccess = () => {
    // Redirect on successful auth to the intended destination
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-header">
            <h1>{isLoginView ? 'Login' : 'Create Account'}</h1>
            <p>
              {isLoginView 
                ? 'Welcome back! Please enter your details.' 
                : 'Fill in the information below to create your account.'}
            </p>
            {from !== '/' && (
              <div className="redirect-notice">
                You need to log in to access this page.
              </div>
            )}
          </div>
          
          <div className="login-form-container">
            {isLoginView ? (
              <LoginForm 
                onSwitchToSignup={toggleView} 
                onSuccess={handleSuccess} 
              />
            ) : (
              <SignupForm 
                onSwitchToLogin={toggleView} 
                onSuccess={handleSuccess} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 