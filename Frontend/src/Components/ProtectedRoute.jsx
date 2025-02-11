import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const role = localStorage.getItem("role");
  if (role === allowedRole) {
    return <Outlet />
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
