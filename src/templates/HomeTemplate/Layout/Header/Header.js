import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100 fixed w-full bg-black bg-opacity-10 z-10   text-white">
      <div className="container flex justify-between h-16 mx-auto">
        <a
          rel="noopener noreferrer"
          href="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          LOGO
        </a>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/"
              className={(navData) =>
                navData.isActive
                  ? "p-2 flex items-center px-4 -mb-1 border-b-2 border-white"
                  : "p-2 flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 "
              }
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className={(navData) =>
                navData.isActive
                  ? "p-2 flex items-center px-4 -mb-1 border-b-2 border-white"
                  : "p-2 flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 "
              }
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className={(navData) =>
                navData.isActive
                  ? "p-2 flex items-center px-4 -mb-1 border-b-2 border-white"
                  : "p-2 flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 "
              }
            >
              News
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button
            onClick={() => {
              navigate("/user/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/user/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            Sign up
          </button>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
