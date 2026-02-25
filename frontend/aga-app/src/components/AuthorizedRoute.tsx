import { useAuthStore } from "@/stores/authStore";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function AuthorizedRoute() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  } else {
    return <Outlet />;
  }
}
