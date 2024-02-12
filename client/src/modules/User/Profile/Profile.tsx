import React, { useEffect, useState } from "react";

import UserService from "../../../services/UserService";

import User from "../../../types/User";

import "./Profile.css";

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await UserService.getProfile();
        setUserProfile(profile);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch user profile");
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        {userProfile?.username && 
          <div>
            <strong>Username:</strong> {userProfile?.username}
          </div>
        }
        {userProfile?.bio && 
          <div>
            <strong>Bio:</strong> {userProfile?.bio}
          </div>
        }
        {userProfile?.email && 
          <div>
            <strong>Email:</strong> {userProfile?.email}
          </div>
        }
        {userProfile?.firstname && userProfile?.lastname &&
          <div>
            <strong>Name:</strong> {userProfile?.firstname} {userProfile?.lastname}
          </div>
        }
        {userProfile?.wallet_address && 
          <div>
            <strong>Wallet Address:</strong> {userProfile?.wallet_address}
          </div>
        }

        <button type="submit" className="login-with-google-btn">
          Connect MetaMask
        </button>
      </div>
    </div>
  );
} 

export default Profile;