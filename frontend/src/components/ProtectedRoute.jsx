import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

function ProtectedRoute({ requiredPermission }) {
  const user = useAuthStore((state) => state.user);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !user?.permissions?.includes(requiredPermission)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
