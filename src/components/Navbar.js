import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { auth, logout } = useAuth();


  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/todos">Todos</Link></li>
        <li><Link to="/about">About</Link></li>
        {auth ? (
          <li>
            <button onClick={logout} className="logout-btn">Logout</button>
          </li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};


export default Navbar;