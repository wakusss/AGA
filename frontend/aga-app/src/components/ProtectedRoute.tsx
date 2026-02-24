import { useAuthStore } from "@/stores/authStore";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  } else if (isAuthenticated) {
    return <Outlet />;
  }
  return <></>;
}
