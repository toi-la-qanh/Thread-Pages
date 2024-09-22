import { Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { nav } from "./Navigation";
import { useState } from "react";
import Login from "./Login";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";

export const RenderRoutes = () => {
  const { token } = useAuth();

  return (
    <>
      <div className="bg-gray-50">
        {!token ? <NavBar /> : <SideBar />}
        <main className="w-full flex justify-center h-auto">
          <div className="shadow-gray-500 shadow-sm lg:w-1/2 md:w-2/3 md:mb-0 mb-28 m-4 w-full rounded-3xl border-gray-300 border bg-white">
            <Routes>
              {nav.map((route, index) => {
                if (!route.isPrivate || (route.isPrivate && token)) {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  );
                } else if (route.isPrivate && !token) {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={<Login isOpen={true} />}
                    />
                  );
                } else return null;
              })}
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
