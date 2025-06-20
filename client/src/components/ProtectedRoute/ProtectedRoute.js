import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const ProtectedRoute = ({ children, allowedRoles  }) => {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // No token found, redirect to login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const userRole = decodedToken.role; 

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("accessToken");
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" state={{ from: location }} replace />;
      }
  
      return children;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("accessToken"); // Remove invalid token
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
