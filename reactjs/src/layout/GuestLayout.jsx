import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function GuestLayout() {
  const { user } = useAuth();

  // if user is logged in, redirect to profile page
  if (user) {
    return <Navigate to="/profile" />;
  }
  return (
    <>
      <NavBar />
      <main className="mt-28 h-full mb-28">
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}
