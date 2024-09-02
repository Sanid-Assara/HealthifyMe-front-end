import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Logout from "./Logout";
import avatarImage from "../assets/avatar.webp";

export default function UserAccess() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const fetchUserData = () => {
    if (!localStorage.getItem("token")) return;

    axios
      .get("https://healthifyme-api.onrender.com/API/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const userId = res.data.userId;
        axios
          .get(`https://healthifyme-api.onrender.com/API/users/${userId}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Fetch user data initially
    fetchUserData();

    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
      fetchUserData();
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
        /* Navbar end when user is logged in */
        <div className="navbar-end gap-2">
          <div className="flex items-center justify-center">
            <p className="text-3xl font-light pl-4 hidden lg:flex">
              Hello, {user.firstname}
            </p>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt={user.firstname}
                  src={user.profilePicture}
                  onError={(e) => {
                    e.target.src = `${avatarImage}`;
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-secondary rounded-box z-[1] mt-3 w-52 p-2 shadow text-primary font-bold"
            >
              <li>
                <NavLink to="/my-recipes">My Recipes</NavLink>
              </li>
              <li>
                <NavLink to="/nutri-analysis">Nutrition Analysis</NavLink>
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
        /* Navbar end when user is not logged in */
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
