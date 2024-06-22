import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Todo App</h1>
        <p>Todo App is designed to help you manage your daily tasks efficiently and keep you organized.</p>
        <h2>Key Features:</h2>
        <ul>
          <li>Adding new tasks</li>
          <li>Marking tasks as completed</li>
          <li>Filtering tasks by status (all, active, completed)</li>
          <li>Secure login with JWT authentication</li>
          <li>Simple and user-friendly interface</li>
          <li>Real-time task updates</li>
          <li>Responsive design for all devices</li>
        </ul>
        <p>Our goal is to help you stay productive and never miss a task again!</p>
        <div className="about-links">
          <Link to="/todos" className="btn primary-btn">Check Your Todos</Link>
          <Link to="/" className="btn secondary-btn">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
