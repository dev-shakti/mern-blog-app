import React from "react";
import { useSelector } from "react-redux";
import {Navigate, Outlet } from "react-router-dom";


const AuthRouteProtection = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  
  
  if (!user || !isLoggedIn) {
    return <Navigate to="/login" replace />; // ✅ Correct way to redirect
  }

  return <Outlet />; // ✅ Allow access to protected routes
};

export default AuthRouteProtection;
