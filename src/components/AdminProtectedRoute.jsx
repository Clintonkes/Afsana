import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "@/lib/AdminAuthContext";

export default function AdminProtectedRoute() {
  const { isAuthenticated, isLoadingAuth } = useAdminAuth();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian">
        <div className="w-8 h-8 border-2 border-white/10 border-t-amber rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
