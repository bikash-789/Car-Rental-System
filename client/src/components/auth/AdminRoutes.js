import { React } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

function AdminRoutes({ children }) {
  const { user } = isAuthenticated();
  if (!user) return <Navigate to="/signin" replace />;
  if (user && user.role == 0) return <Navigate to="/error" replace />;
  return children;
}

export default AdminRoutes;
