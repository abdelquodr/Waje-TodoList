// src/contexts/AuthContext.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';


const TestComponent = () => {
  const { auth, login, logout } = useAuth();
  return (
    <div>
      {auth ? (
        <>
          <p>Logged In</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>Logged Out</p>
          <button onClick={() => login('test-token')}>Login</button>
        </>
      )}
    </div>
  );
};

test('handles login and logout', () => {
  render(
    <Router>
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    </Router> 
  );

  const loginButton = screen.getByText(/login/i);
  fireEvent.click(loginButton);

  expect(screen.getByText(/logged in/i)).toBeInTheDocument();

  const logoutButton = screen.getByText(/logout/i);
  fireEvent.click(logoutButton);

  expect(screen.getByText(/logged out/i)).toBeInTheDocument();
});
