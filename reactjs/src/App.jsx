import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ProtectedLayout from "./layout/ProtectedLayout";
import GuestLayout from "./layout/GuestLayout";
import Post from "./components/Post";
import NavBar from "./components/NavBar";

function App() {
  return (
  <>
    <NavBar />
    
    <Routes >
      {/* <div className="bg-black w-full h-auto"> */}
      <Route path="/" element={<GuestLayout />}>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/about" element={<About />}></Route>
      </Route>
      <Route path="/" element={<ProtectedLayout />}>
        <Route exact path="/post" element={<Post />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Route>
      {/* </div> */}
    </Routes>
    </>
  )
}
export default App;
