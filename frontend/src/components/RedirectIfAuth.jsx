import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

function RedirectIfAuth({ children }) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return accessToken ? <Navigate to="/" replace /> : children;
}

export default RedirectIfAuth;
