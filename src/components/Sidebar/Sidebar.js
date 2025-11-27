/*eslint-disable*/
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaTachometerAlt, FaUsers, FaCalendarAlt, FaComments, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa"; // Added icons for better UI

export default function Sidebar({ collapsed, toggleCollapse }) {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleLogout = () => {
    // Remove token and redirect to login
    localStorage.removeItem("token");
    window.location.href = "/admin/auth/login";
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { path: "/admin/users", icon: <FaUsers />, label: "Users" },
    { path: "/admin/appointments", icon: <FaCalendarAlt />, label: "Appointments" },
    { path: "/admin/contact-messages", icon: <FaComments />, label: "Contact Messages" },
    { path: "/admin/profile", icon: <FaUser />, label: "Profile" },
    { path: "/admin/settings", icon: <FaCog />, label: "Settings" }
  ];

  return (
    <div className="h-full bg-green-50 shadow-lg flex flex-col">
      {/* Brand */}
      <div className="p-4 border-b border-green-100 flex items-center justify-between">
        {!collapsed ? (
          <Link
            className="text-left text-green-800 inline-block whitespace-nowrap text-lg font-bold"
            to="/"
          >
            Aarogyam Admin
          </Link>
        ) : (
          <Link
            className="text-left text-green-800 inline-block whitespace-nowrap text-lg font-bold"
            to="/"
          >
            A
          </Link>
        )}
        
        {/* Collapse/Expand button */}
        <button
          onClick={toggleCollapse}
          className="text-green-700 hover:text-green-900 focus:outline-none"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav>
          <ul className="space-y-1 px-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  className={`flex items-center p-3 text-sm rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-green-200 text-green-800"
                      : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                  } ${collapsed ? "justify-center" : ""}`}
                  to={item.path}
                >
                  <span className={`${collapsed ? "" : "mr-3"}`}>
                    {item.icon}
                  </span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
            
            {/* Logout button */}
            <li>
              <button
                onClick={handleLogout}
                className={`flex items-center p-3 text-sm rounded-lg transition-all duration-200 w-full text-left ${
                  "text-red-600 hover:bg-red-100 hover:text-red-700"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <span className={`${collapsed ? "" : "mr-3"}`}>
                  <FaSignOutAlt />
                </span>
                {!collapsed && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}