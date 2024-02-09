import React from 'react';
import { Link } from 'react-router-dom';

import logo from "../../../assets/images/logo.png";

import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/"><img src={logo} alt="" /></Link>
      </div>
      <div className="navbar__links">
        {/* <Link to="/profile">Profile</Link> */}
        {/* <Link to="/posts">Posts</Link> */}
      </div>
      <div className="navbar__buttons">
        <Link to="/login" className='btn'>Login</Link>
        <Link to="/registration" className='btn'>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
