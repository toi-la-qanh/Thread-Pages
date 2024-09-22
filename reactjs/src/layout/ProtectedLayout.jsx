import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../components/Login";
// import Model from "react-modal";

export default function ProtectedLayout() {
  const { token } = useAuth();
  const [visible, setVisible] = useState(false);

  return (
    <>
      {!token ? (
        <Model isOpen={!visible} onRequestClose={() => setVisible(false)}>
          <button onClick={() => setVisible(false)}>Close</button>
          <Login />
        </Model>
      ) : (
        <Outlet />
      )}
    </>
  );
}
