import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function GuestLayout() {

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
