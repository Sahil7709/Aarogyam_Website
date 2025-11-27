import React from "react";
import { FaBars } from "react-icons/fa"; // Added icon for mobile menu toggle
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
        >
          <FaBars size={20} />
        </button>
        <div className="text-lg font-semibold text-green-700"> {/* Changed to green for health theme */}
          Admin Panel
        </div>
      </div>
      <div className="flex items-center">
        <UserDropdown />
      </div>
    </nav>
  );
}