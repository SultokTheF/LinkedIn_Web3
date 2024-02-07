import React from "react";
import { Routes, Route } from 'react-router-dom';

import "./assets/global.css";

import { LoginPage, RegistrationPage, UserProfilePage } from "./pages";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/user/:username" element={ <UserProfilePage /> } />

        <Route path='/login' element={ <LoginPage /> } />
        <Route path="/registration" element={ <RegistrationPage /> } />
      </Routes>
    </>
  );
}

export default App;