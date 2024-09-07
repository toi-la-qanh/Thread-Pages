import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

export default function ProtectedLayout() {
  const { user, setUser } = useAuth();

  // check if user is logged in or not from server
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: {
            Accept: "application/json",
            // 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          },
          withCredentials: true,
          withXSRFToken: true,
        });
        if (response.status === 200) {
          setUser(response.data.data);
          return <Navigate />;
        }
        else if(response.status === 401){

        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // if user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // logout user
  const handleLogout = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:8000/logout",
        {
          headers: {
            Accept: "application/json",
            // 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      if (resp.status === 200) {
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SideBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
