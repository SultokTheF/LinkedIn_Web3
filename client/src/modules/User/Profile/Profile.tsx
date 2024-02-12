import React, { useEffect, useState } from "react";

import UserService from "../../../services/UserService";

import User from "../../../types/User";

import "./Profile.css";

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await UserService.getProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        { userProfile?.username ? (
          <>
            <div>
              <strong>Username:</strong> {userProfile?.username}
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>Username:</strong> unspecified
            </div>
          </>
        ) }

        { userProfile?.bio ? (
          <>
            <div>
              <strong>Bio:</strong> {userProfile?.bio}
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>Bio:</strong> unspecified
            </div>
          </>
        ) }

        { userProfile?.email ? (
          <>
            <div>
              <strong>Email:</strong> {userProfile?.email}
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>Email:</strong> unspecified
            </div>
          </>
        ) }
        
        { userProfile?.firstname && userProfile?.lastname ? (
          <>
            <div>
              <strong>Name:</strong> {userProfile?.firstname} {userProfile?.lastname}
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>Username:</strong> unspecified
            </div>
          </>
        ) }

        { userProfile?.wallet_address ? (
          <>
            <div>
              <strong>Wallet:</strong> {userProfile?.wallet_address}
            </div>
          </>
        ) : (
          <>
            <div>
              <button type="submit" className="login-with-google-btn">
                Connect MetaMask
              </button>
            </div>
          </>
        ) }

        <div>
          <button type="submit" className="update-button">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
} 

export default Profile;