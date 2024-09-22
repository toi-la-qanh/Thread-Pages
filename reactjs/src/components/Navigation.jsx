import React from "react";
import Register from "./Register";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Login from "./Login";
import SpecifiedPost from "./SpecifiedPost";
import CreatePost from "./CreatePost";

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isPrivate: false,
  },
  {
    path: "/search",
    name: "Search",
    element: <Search />,
    isPrivate: false,
  },
  {
    path: "/create-post",
    name: "CreatePost",
    element: <CreatePost isOpen={true}/>,
    isPrivate: true,
  },
  {
    path: "/post/:id",
    name: "SpecifiedPost",
    element: <SpecifiedPost />,
    isPrivate: false,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isPrivate: false,
  },
  {
    path: "/register",
    name: "Register",
    element: <Register />,
    isPrivate: false,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    element: <Profile />,
    isPrivate: false,
  },
  {
    path: "/notification",
    name: "Notification",
    element: <Notification />,
    isPrivate: true,
  },
];
