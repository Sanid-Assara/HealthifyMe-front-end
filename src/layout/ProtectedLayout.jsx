import { Outlet, Navigate } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

export default function ProtectedLayout() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <div className="flex flex-col min-h-screen">
      <div>top</div>
      {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
      <div>bottom</div>
    </div>
  );
}
