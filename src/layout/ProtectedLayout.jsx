import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedLayout() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
}
