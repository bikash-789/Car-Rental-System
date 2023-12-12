import { React } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

function PrivateRoute({ children }) {
  const auth = isAuthenticated();
  if (!auth) return <Navigate to="/signin" replace />;
  return children;
}

export default PrivateRoute;
