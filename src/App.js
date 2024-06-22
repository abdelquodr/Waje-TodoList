import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TodoApp from './components/TodoApp';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import About from './components/About';
import Home from './components/Home';


const ProtectedRoute = ({ children  }) => {
  const { auth } = useAuth();
  console.log(auth, "auth from app.js root")
  return auth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<ProtectedRoute><TodoApp /></ProtectedRoute> } />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={ <Login /> } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
