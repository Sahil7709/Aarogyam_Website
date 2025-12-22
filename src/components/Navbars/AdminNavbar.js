import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaBell, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function AdminNavbar({ toggleSidebar }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  
  const handleLogout = () => {
    // Remove token and redirect to login
    localStorage.removeItem("token");
    window.location.href = "/admin/auth/login";
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <button
              onClick={toggleSidebar}
              className="cursor-pointer text-green-700 inline-flex items-center justify-center px-3 py-1 rounded-md text-xl leading-none outline-none focus:outline-none lg:hidden"
              type="button"
            >
              <FaBars />
            </button>
            <Link
              className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-green-700"
              to="/admin/dashboard"
            >
              Welcome Admin
            </Link>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
              <div className="relative flex w-full flex-wrap items-stretch">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-2">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search here..."
                  className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                />
              </div>
            </form>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <FaBell className="text-lg leading-lg mr-1" />
                  <span className="lg:hidden inline-block ml-1">Notifications</span>
                </a>
              </li>
              <li className="flex items-center">
                <Link
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
                  to="/admin/profile"
                >
                  <FaUser className="text-lg leading-lg mr-1" />
                  <span className="lg:hidden inline-block ml-1">Profile</span>
                </Link>
              </li>
              <li className="flex items-center">
                <button
                  className="hover:text-red-500 text-red-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="text-lg leading-lg mr-1" />
                  <span className="lg:hidden inline-block ml-1">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}