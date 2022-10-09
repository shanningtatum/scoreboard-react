import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  // checks to see if user is checked in, if not, navigate to main page.
  if (!user) {
    return <Navigate to="/signup" />;
  }

  return children;
};

export default ProtectedRoute;
