import React from "react";
import { Routes, Route } from 'react-router-dom';

import "./assets/global.css";

import { Navbar } from "./components/layouts";

import { LoginPage, RegistrationPage, UserProfilePage } from "./pages";

const App: React.FC = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/user/:username" element={ <UserProfilePage /> } />

        <Route path='/login' element={ <LoginPage /> } />
        <Route path="/registration" element={ <RegistrationPage /> } />
      </Routes>
    </>
  );
}

export default App;