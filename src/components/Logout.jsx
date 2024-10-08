import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(
        "https://healthifyme-api.onrender.com/API/users/logout",
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      localStorage.removeItem("token");

      window.dispatchEvent(new Event("authChanged"));

      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      localStorage.removeItem("token");

      window.dispatchEvent(new Event("authChanged"));

      navigate("/");
    }
  }, [navigate]);

  return <div onClick={handleLogout}>Log out</div>;
}
