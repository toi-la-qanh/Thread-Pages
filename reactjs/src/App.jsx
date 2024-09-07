import { Routes, Route } from "react-router-dom";
import React from "react";
import Register from "./components/Register";
import Home from "./components/Home";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ProtectedLayout from "./layout/ProtectedLayout";
import GuestLayout from "./layout/GuestLayout";
import Post from "./components/Post";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
        </Route>
        <Route path="/" element={<ProtectedLayout />}>
          {/* <Route index element={<Home />}></Route> */}
          <Route exact path="/post" element={<Post />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
