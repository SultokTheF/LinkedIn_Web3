import React, { useState, useEffect, FormEvent } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

import AuthService from "../../../services/AuthService";

import User from "../../../types/User";

import "../assets/Authorization.css";
import "./Registration";

const Registration: React.FC = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };              
  const [wallet, setWallet] = useState(initialState); 

  const [userData, setUserData] = useState<User & { confirm_password: string }>({
    username: "",
    email: "",
    bio: "",
    password: "",
    confirm_password: ""
  });

  const [userMetaMaskData, setUserMetaMaskData] = useState<User & { confirm_password?: string }>({
    wallet_address: wallet.accounts[0] || "",
    password: "",
    confirm_password: ""
  });

  const [signUpWithMetaMask, setSignUpWithMetaMask] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<String>("");

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider));
    }

    getProvider()
  }, [])                                             

  const handleConnect = async () => {              
    const accounts = await window.ethereum.request({ 
      method: "eth_requestAccounts",               
    });                  

    setWallet({ accounts });

    setUserMetaMaskData({
      wallet_address: accounts[0]
    });

    setSignUpWithMetaMask(true);                         
  }

  const goBack = () => {
    setSignUpWithMetaMask(false);
  }

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault();
  
    if (userData.password === userData.confirm_password) {
      try {
        // Call the register method from AuthService
        const response = await AuthService.register(userData);
  
        if (response) {
          setErrorMsg("");
          window.location.replace("/login");
        } else {
          setErrorMsg("Something went wrong! Please try later")
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMsg("This username or email is already in use!");
      }
    } else {
      console.error("Passwords don't match!");
      setErrorMsg("Passwords don't match!");
    }
  };
  
  const handleRegistrationWithMetaMask = async (e: FormEvent) => {
    e.preventDefault();
  
    if (userMetaMaskData.password === userMetaMaskData.confirm_password) {
      try {
        console.log(userMetaMaskData.wallet_address);
        // Call the registerWithMetaMask method from AuthService
        const response = await AuthService.registerWithMetaMask(userMetaMaskData);
  
        if (response) {
          setErrorMsg("");
          window.location.replace("/login");
        } else {
          setErrorMsg("Something went wrong! Please try later")
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMsg("This wallet is already in use!");
      }
    } else {
      console.error("Passwords don't match!");
      setErrorMsg("Passwords don't match!");
    }
  };  

  return (
    <div className="registration">
      <div className="authorization flex">
        <h1>Registration</h1>
        { signUpWithMetaMask ? (
          <>
            <form onSubmit={handleRegistrationWithMetaMask}>
              <label htmlFor="password_metamask">Password</label>
              <input 
                type="password" 
                id="password_metamask" 
                placeholder="Password" 
                value={userMetaMaskData.password}
                onChange={(e) => setUserMetaMaskData({ ...userMetaMaskData, password: e.target.value })}
                required
              />

              <label htmlFor="confirm-password_metamask">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password_metamask" 
                placeholder="Confirm Password" 
                value={userMetaMaskData.confirm_password || ''} // Ensure controlled status
                onChange={(e) => setUserMetaMaskData({ ...userMetaMaskData, confirm_password: e.target.value })}
                required
              />

              { hasProvider && 
                <button type="submit" className="login-with-google-btn">
                  Sign Up with MetaMask
                </button>
              } 

              <button onClick={goBack}>&laquo; back</button>

              <p>Already have an account? <a href="/login">Login</a></p>
              <p className="errorMsg"> {errorMsg} </p>
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
                value={userData.confirm_password ||  ''} // Ensure controlled status
                onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
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
