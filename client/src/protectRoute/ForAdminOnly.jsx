import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ForAdminOnly = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  if (!user || !isLoggedIn || !user.role === "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // ✅ Allow access to protected routes
};

export default ForAdminOnly;
