import { NavLink } from "react-router-dom";
import logo from "../assets/logo-HealthifyMe.jpg";

export default function Navbar() {
  return (
    <>
      <div className="bg-primary text-neutral-content">
        <div className="navbar container  m-auto py-2">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow text-neutral"
              >
                <NavLink to="/">
                  <li className="text-lg font-bold">Home</li>
                </NavLink>
                <NavLink to="/recipes/explore">
                  <li className="text-lg font-bold">Recipes</li>
                </NavLink>
                <NavLink to="/workout/explore">
                  <li className="text-lg font-bold">Workouts</li>
                </NavLink>
                <NavLink to="/community">
                  <li className="text-lg font-bold">Community</li>
                </NavLink>
              </ul>
            </div>
            <NavLink to="/" className="flex items-center justify-center">
              <img src={logo} alt="Logo HealthifyMe" width="60px" />
              <p className="text-3xl font-light pl-4 hidden lg:flex">
                HealthifyMe
              </p>
            </NavLink>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu gap-8 menu-horizontal px-1">
              <NavLink to="/">
                <li className="text-lg font-bold">Home</li>
              </NavLink>
              <NavLink to="/recipes/explore">
                <li className="text-lg font-bold">Recipes</li>
              </NavLink>
              <NavLink to="/workout/explore">
                <li className="text-lg font-bold">Workouts</li>
              </NavLink>
              <NavLink to="/community">
                <li className="text-lg font-bold">Community</li>
              </NavLink>
            </ul>
          </div>
          {/* Navbar end when user still not register or login*/}
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
          {/* Navbar end when user is Login */}
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
                  <NavLink to="/dashboard">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/settings">Settings</NavLink>
                </li>
                <li>
                  <NavLink to="/">Logout</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
