import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store authentication token
  const [auth, setAuth] = useState(localStorage.getItem('token') || null);

  // Function to handle login
  const login = (token) => {
    setAuth(token);
    localStorage.setItem('token', token);
  };

  // Function to handle logout
  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
  };

  // Provide auth state and functions to children
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

