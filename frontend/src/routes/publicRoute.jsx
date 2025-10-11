import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = !!localStorage.getItem("authToken")||""; // or use context / redux
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
