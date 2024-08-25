import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";

export default function UserAccess() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleAuthChange = () => {
      console.log("Auth status changed:", !!localStorage.getItem("token"));
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    // Listen for the custom authChanged event
    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="navbar-end gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-neutral"
            >
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/settings">Settings</NavLink>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-6">
          <NavLink to="/signup">
            <button className="btn btn-outline btn-secondary rounded-full">
              Signup
            </button>
          </NavLink>
          <NavLink to="/login">
            <button className="btn btn-active btn-secondary rounded-full">
              Login
            </button>
          </NavLink>
        </div>
      )}
    </>
  );
}
