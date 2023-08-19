import React, { useState } from "react";
import { List, Aperture, Chatbox, Menu, Close } from "react-ionicons";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav>
      {/* Sidebar Toggle Button */}
      <div className="flex space-x-4 items-center p-2 sm:hidden">
        <button
          onClick={toggleSidebar}
          type="button"
          className="p-2 bg-slate-200 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        >
          <Menu color={"#00000"} height="25px" width="25px" />
        </button>
        <h6 className="text-slate-500 font-bold text-xl">{document.title}</h6>
      </div>

      {/* Sidebar Content */}
      <aside
        id="cta-button-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <div className="flex space-x-1  items-stretch justify-between">
            {/* Header Title */}
            <div className="flex items-center p-2 text-gray-200 rounded-lg bg-slate-700 group shadow-md flex-grow">
              <Aperture color={"#f9fafb"} height="25px" width="25px" />
              <span className="ml-3 text-lg -800 font-medium">
                Chat Assistant
              </span>
            </div>
            {/* Sidebar Close button */}

            <button
              onClick={toggleSidebar}
              type="button"
              className="p-2 bg-slate-200 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-12 flex items-center justify-center"
            >
              <Close color={"#00000"} width="25px" />
            </button>
          </div>

          {/* Sidebar Items */}
          <ul className="space-y-2 font-medium mt-3">
            {/* Sidebar Item 1 */}
            <Link
              to="/"
              className={`flex items-center p-2 text-gray-800 rounded-lg   ${
                location.pathname === "/"
                  ? "bg-slate-300"
                  : "bg-slate-50 hover:bg-gray-200"
              }`}
            >
              <Chatbox color={"#314673"} height="30px" width="30px" />
              <span className="ml-3">Chat </span>
            </Link>
            {/* Sidebar Item 2 */}
            <Link
              to="/history"
              className={`flex items-center p-2 text-gray-800 rounded-lg   ${
                location.pathname === "/history"
                  ? "bg-slate-300"
                  : "bg-slate-50 hover:bg-gray-200"
              }`}
            >
              <List color={"#314673"} height="30px" width="30px" />
              <span className="ml-3">History </span>
            </Link>
          </ul>
        </div>
      </aside>
    </nav>
  );
};

export default Sidebar;
