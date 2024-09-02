import { Outlet, Navigate } from "react-router-dom";
import SearchProvider from "../context/SearchProvider";

export default function ProtectedLayout() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <SearchProvider>
      <div className="flex flex-col min-h-screen">
        {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </SearchProvider>
  );
}
