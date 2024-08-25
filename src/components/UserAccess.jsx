import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Logout from "./Logout";
import avatarImage from "../assets/avatar.webp";

export default function UserAccess() {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    axios
      .get("https://healthifyme-api.onrender.com/API/users/profile ", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.userId);
        axios
          .get(
            `https://healthifyme-api.onrender.com/API/users/${res.data.userId}`
          )
          .then((res) => {
            console.log(res.data);
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [isAuthenticated]);

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
        /* Navbar end when user is Login */
        <div className="navbar-end gap-2">
          <div className=" flex items-center justify-center">
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
                  alt={user.firstname || "User avatar"}
                  src={user.profilePicture || avatarImage}
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
        /* Navbar end when user still not register or login*/
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
          <NavLink to="/login">
            <div className="dropdown">
              <div className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={avatarImage} />
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      )}
    </>
  );
}
