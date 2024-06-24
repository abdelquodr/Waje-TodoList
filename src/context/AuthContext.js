import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store authentication token
  const [auth, setAuth] = useState(localStorage.getItem('token') || null);

  const login = (token) => {
    setAuth(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

