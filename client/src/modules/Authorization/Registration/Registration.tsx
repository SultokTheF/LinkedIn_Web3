import "../assets/Authorization.css";
import "./Registration";

import React, { useState, useEffect, FormEvent } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import axios from "axios";

import { AuthEndpoints } from "../../../constants/endpoints";
import User from "../../../types/User";

const Registration: React.FC = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };              
  const [wallet, setWallet] = useState(initialState); 

  const [userData, setUserData] = useState<User>({
    username: "",
    email: "",
    bio: "",
    password: "",
  });

  const [userMetaMaskData, setUserMetaMaskData] = useState<User>({
    wallet_address: wallet.accounts[0],
    password: ""
  });

  const [signUpWithMetaMask, setSignUpWithMetaMask] = useState<boolean>(false);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider));
    }

    getProvider()
  }, [])

  const updateWallet = async (accounts:any) => {
    setWallet({ accounts });
  }                                                

  const handleConnect = async () => {              
    let accounts = await window.ethereum.request({ 
      method: "eth_requestAccounts",               
    });                                             
    updateWallet(accounts);
    setSignUpWithMetaMask(true);                         
  }

  const goBack = () => {
    setSignUpWithMetaMask(false);
  }

  const goMetaMask = () => {
    setSignUpWithMetaMask(true);
  }


  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(AuthEndpoints.register, userData);

      if (response.status === 204) {
        setUserData({
          username: "",
          email: "",
          bio: "",
          password: ""
        });

        alert("Registration successful");
      } else {
        
      }
    } catch (e) {
      return console.error("Error:", e);
    }
  };

  const handleRegistrationWithMetaMask = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log(wallet.accounts[0]);

      setUserMetaMaskData({
        wallet_address: wallet.accounts[0],
        password: ""
      });

      const response = await axios.post(AuthEndpoints.registerWithMetaMask, userMetaMaskData);

      if (response.status === 201) {
        setUserMetaMaskData({
          wallet_address: wallet.accounts[0],
          password: ""
        });

        alert("Registration successful");
      } else {
        
      }
    } catch (e) {
      return console.error("Error:", e);
    }
  };

  return (
    <div className="registration">
      <div className="authorization flex">
        <h1>Registration</h1>
        { signUpWithMetaMask ? (
          <>
            <form>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                required
              />

              <label htmlFor="confirm-password">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                placeholder="Confirm Password" 
                required
              />

              { hasProvider && 
                <button type="submit" className="login-with-google-btn" onClick={handleRegistrationWithMetaMask}>
                  Sign Up with MetaMask
                </button>
              } 

              <button onClick={goBack}>&laquo; back</button>

              <p>Already have an account? <a href="/login">Login</a></p>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleRegistration} className="signup_form">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Username"
                value={ userData.username }
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                required
              />

              <label htmlFor="bio">Bio</label>
              <textarea 
                id="bio" 
                placeholder="Bio"
                value={ userData.bio }
                onChange={ (e) => setUserData({ ...userData, bio: e.target.value }) }
                required
              ></textarea>

              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Email" 
                value={ userData.email }
                onChange={ (e) => setUserData({ ...userData, email: e.target.value }) }
                required
              />

              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                value={ userData.password }
                onChange={ (e) => setUserData({ ...userData, password: e.target.value }) }
                required
              />

              <label htmlFor="confirm-password">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                placeholder="Confirm Password" 
                required
              />

              <button>Sign Up</button>

              { hasProvider && 
                <button type="button" className="login-with-google-btn" onClick={handleConnect}>
                  Sign Up with MetaMask
                </button>
              } 

              <p>Already have an account? <a href="/login">Login</a></p>
            </form>
          </>
        
        ) }
      </div>
    </div>
  );
};

export default Registration;
