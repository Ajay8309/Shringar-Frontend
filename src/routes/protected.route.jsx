import { useUser } from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

 const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;