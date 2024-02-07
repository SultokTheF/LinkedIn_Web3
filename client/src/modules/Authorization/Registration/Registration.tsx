import "../assets/Authorization.css";
import "./Registration";

import React, { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

const Registration: React.FC = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };              
  const [wallet, setWallet] = useState(initialState); 

  const [signUpWithMetaMask, setSignUpWithMetaMask] = useState<boolean>(false);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider));
    }

    getProvider()
  }, [])

  const updateWallet = async (accounts:any) => {  
    setSignUpWithMetaMask(true);
    setWallet({ accounts });
  }                                                

  const handleConnect = async () => {              
    let accounts = await window.ethereum.request({ 
      method: "eth_requestAccounts",               
    });                                             
    updateWallet(accounts);                         
  }    

  const goBack = () => {
    setSignUpWithMetaMask(false);
  }

  return (
    <div className="authorization">
      <h1>Registration</h1>

      <form>
        { signUpWithMetaMask ? (
          <>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm Password" />

            { hasProvider && 
              <button type="button" className="login-with-google-btn" onClick={handleConnect}>
                Sign Up with MetaMask
              </button>
            } 

            <button onClick={goBack}>&laquo; back</button>
          </>
        ) : (
          <>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Username" />

            <label htmlFor="bio">Bio</label>
            <textarea id="bio" placeholder="Bio"></textarea>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm Password" />

            <button>Sign Up</button>

            { hasProvider && 
              <button type="button" className="login-with-google-btn" onClick={handleConnect}>
                Sign Up with MetaMask
              </button>
            } 
          </>
        ) }

        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Registration;
