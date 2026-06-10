import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

function ProtectedRoute({ requiredPermission }) {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  // Not logged in
  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Permission check
  if (requiredPermission && !user?.permissions?.includes(requiredPermission)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
