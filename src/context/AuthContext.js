import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store authentication token
  const [auth, setAuth] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  const login = (token) => {
    setAuth(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

