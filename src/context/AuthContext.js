// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Keys for local storage
const AUTH_STORAGE_KEY = 'homeScopeAuth';
const USERS_STORAGE_KEY = 'homeScopeUsers';

// Initial users for the app (will be stored in localStorage)
const INITIAL_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password123' }
];

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  // State to hold the current user info
  const [user, setUser] = useState(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      return storedAuth ? JSON.parse(storedAuth) : null;
    } catch (error) {
      console.error("Error reading auth from local storage", error);
      return null;
    }
  });

  // State to hold registered users
  const [users, setUsers] = useState(() => {
    try {
      // Try to get users from localStorage
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      
      // If no users in localStorage, use initial users
      if (!storedUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      
      return JSON.parse(storedUsers);
    } catch (error) {
      console.error("Error reading users from local storage", error);
      return INITIAL_USERS;
    }
  });

  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  // State to track loading status (for async operations)
  const [isLoading, setIsLoading] = useState(false);
  // State to track error messages
  const [authError, setAuthError] = useState('');

  // Function to login
  const login = (credentials) => {
    setIsLoading(true);
    setAuthError('');

    // Simulate network request
    setTimeout(() => {
      // Find user with matching email and password
      const foundUser = users.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (foundUser) {
        // Create a user object without the password
        const userWithoutPassword = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        };
        
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        
        try {
          // Save to localStorage (without password)
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
        } catch (error) {
          console.error("Error saving auth to local storage", error);
        }
      } else {
        setAuthError('Invalid email or password');
      }
      
      setIsLoading(false);
    }, 800); // Simulate network delay
  };

  // Function to signup
  const signup = (userData) => {
    setIsLoading(true);
    setAuthError('');

    // Simulate network request
    setTimeout(() => {
      // Check if email already exists
      const emailExists = users.some(u => u.email === userData.email);
      
      if (emailExists) {
        setAuthError('Email already in use');
        setIsLoading(false);
        return;
      }
      
      // Create new user
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: userData.name,
        email: userData.email,
        password: userData.password
      };
      
      // Create a user object without the password
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      // Update users list
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      
      // Update localStorage
      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error saving users to local storage", error);
      }
      
      // Log the user in
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      try {
        // Save to localStorage (without password)
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      } catch (error) {
        console.error("Error saving auth to local storage", error);
      }
      
      setIsLoading(false);
    }, 800); // Simulate network delay
  };

  // Function to logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthError('');
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error("Error removing auth from local storage", error);
    }
  };

  // Update isAuthenticated when user changes
  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  // Provide the auth state and functions to children
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        isLoading, 
        authError, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the auth context
export const useAuth = () => {
  return useContext(AuthContext);
}; 