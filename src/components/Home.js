import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Todo App</h1>
        <p>Organize your tasks efficiently with our simple and intuitive Todo List application. Stay on top of your to-do's and manage your day effectively.</p>
        <div className="home-links">
          <Link to="/todos" className="btn primary-btn">Go to Todo List</Link>
          <Link to="/about" className="btn secondary-btn">Learn More About Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
