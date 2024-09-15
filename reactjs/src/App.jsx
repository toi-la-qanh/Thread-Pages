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
import { useAuth } from "./contexts/AuthContext";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import SpecifiedPost from "./components/SpecifiedPost";

function App() {
  const { token } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={token ? <ProtectedLayout /> : <GuestLayout />}>
          <Route path="/search" element={<Search />} />
          <Route index element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<SpecifiedPost />} />
          {!token ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/profile" element={<Profile />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
}
export default App;
