import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/NavBar";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
<<<<<<< HEAD
import Home from "./components/home/Home"
=======
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/settings";
>>>>>>> 817b1690b2b37cddb9bab7625dbd3edc35ceebc3

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
=======
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
>>>>>>> 817b1690b2b37cddb9bab7625dbd3edc35ceebc3
      </Routes>
    </Router>
  );
}

export default App;