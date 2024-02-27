import React from "react";
import { Routes, Route } from 'react-router-dom';

import "./assets/global.css";

import { Navbar } from "./components/layouts";
import Home from "./pages/Home";
import { LoginPage, RegistrationPage, ProfilePage } from "./pages";

const App: React.FC = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/profile" element={ <ProfilePage /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path="/registration" element={ <RegistrationPage /> } />
      </Routes>
    </>
  );
}

export default App;