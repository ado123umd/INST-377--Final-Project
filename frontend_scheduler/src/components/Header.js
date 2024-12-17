import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    return (
        <nav className="navbar">
        <div className="navbar-logo">
        <Link to="/">UMD Course Scheduler</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/schedule">Schedule</Link></li>
        </ul>
      </nav>

    );
};
   


export default Header;
