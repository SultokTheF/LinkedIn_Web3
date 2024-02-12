import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UserService from '../../../services/UserService';
import AuthService from '../../../services/AuthService';

import User from '../../../types/User';

import logo from "../../../assets/images/logo.png";

import "./Navbar.css";

const Navbar: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User>();
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await UserService.getProfile();
        setUserProfile(profile);
        setLoginStatus(true);
      } catch (error) {
        console.error("Error fetching user Data");
      }
    };

    fetchProfile();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/"><img src={logo} alt="" /></Link>
      </div>
      <div className="navbar__links">
        {/* <Link to="/profile">Profile</Link> */}
        {/* <Link to="/posts">Posts</Link> */}
      </div>

      {loginStatus ? (
        <>
          <div className="navbar__buttons">
            <Link to="/profile" className='btn'>Profile</Link>
            <button className='btn'>Logout</button>
          </div>
        </>
      ) : (
        <>
          <div className="navbar__buttons">
            <Link to="/login" className='btn'>Login</Link>
            <Link to="/registration" className='btn'>Sign Up</Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
