import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';


const ProtectedRoute = ({ children  }) => {
  const { auth } = useAuth();
  console.log(auth, "auth from app.js root")
  return auth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/todos" element={<ProtectedRoute><TodoApp /></ProtectedRoute> } />
            <Route path="/" element={ <Login /> } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
