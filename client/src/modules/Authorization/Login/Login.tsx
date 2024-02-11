import React, { useState, useEffect, FormEvent } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

import AuthService from "../../../services/AuthService";

import User from "../../../types/User";

import "../assets/Authorization.css";
import "./Login.css";

const Login: React.FC = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };              
  const [wallet, setWallet] = useState(initialState);

  const [userData, setUserData] = useState<User>({
    email: "",
    password: ""
  });

  const [userMetaMaskData, setUserMetaMaskData] = useState<User>({
    wallet_address: wallet.accounts[0] || "",
    password: ""
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await AuthService.login(userData);

      if (response) {
        setErrorMsg("");
        window.location.replace("/user");
      } else {
        setErrorMsg("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Failed to login");
    }
  };
  
  const handleLoginWithMetaMask = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await AuthService.loginWithMetaMask(userMetaMaskData);

      if (response) {
        setErrorMsg("");
        window.location.replace("/user");
      } else {
        setErrorMsg("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Failed to login");
    }
  };  

  return (
    <div className="login">
      <div className="authorization flex">
        <h1>Login</h1>
        { signUpWithMetaMask ? (
          <>
            <form onSubmit={handleLoginWithMetaMask}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                value={userMetaMaskData.password}
                onChange={(e) => setUserMetaMaskData({ ...userMetaMaskData, password: e.target.value })}
                required
              />

              { hasProvider && 
                <button type="submit" className="login-with-google-btn">
                  Login with MetaMask
                </button>
              } 

              <button onClick={goBack}>&laquo; back</button>

              <p>Do not have an account? <a href="/registration">Sign Up</a></p>
              <p className="errorMsg"> {errorMsg} </p>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleLogin}>
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

              <button>Login</button>

              { hasProvider && 
                <button type="button" className="login-with-google-btn" onClick={handleConnect}>
                  Login with MetaMask
                </button>
              } 

              <p>Do not have an account? <a href="/registration">Sign Up</a></p>
              <p className="errorMsg"> {errorMsg} </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
