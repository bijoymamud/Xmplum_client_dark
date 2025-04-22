import React, { useState, useRef, useEffect } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  Settings,
  ChevronDown,
  LogOut,
  User,
  Moon,
  Sun,
  Home,
  Users,
  FileText,
  BarChart,
  Database,
} from "lucide-react";
import { useDarkMood } from "../../Context/ThemeContext";
import { useLoggeInUserQuery } from "../../redux/features/baseApi";
import { RiHomeOfficeLine } from "react-icons/ri";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { darkMode, setDarkMode } = useDarkMood();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { data: userInfo } = useLoggeInUserQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/login");
    setIsModalOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sidebar navigation items
  const navItems = [
    { to: "/admin/admin_home", label: "Admin Home", icon: Home },
    { to: "/admin/user_info", label: "Users", icon: Users },
    // { to: "/reports", label: "Reports", icon: FileText },
    // { to: "/analytics", label: "Analytics", icon: BarChart },
    // { to: "/data", label: "Data Management", icon: Database },
    // { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-24" : "w-80"
        } bg-white dark:bg-[#131221] border-r-2 dark:border-[#656092] border-gray-200 dark:text-[#D0CDEF] text-gray-800 flex flex-col transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h1
            className={`font-bold text-xl text-gray-800 dark:text-white ${
              isSidebarCollapsed ? "text-center" : ""
            }`}
          >
            {isSidebarCollapsed ? "AD" : "Admin Dashboard"}
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex font-medium text-lg items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <item.icon size={20} />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            className="w-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200"
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            <Menu size={20} />
            {!isSidebarCollapsed && <span>Toggle Sidebar</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-[82px] border-b border-gray-500 bg-white dark:bg-[#1B1744] flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
        
            <h2 className="text-lg font-semibold text-gray-800 dark:text-[#D0CDEF]">
              Welcome, {userInfo?.user?.full_name || "Admin"}
            </h2>
          </div>

         <div className="flex items-center">
         <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} className="text-[#D0CDEF]" /> : <Moon size={20} />}
            </button>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Open user menu"
              aria-expanded={isDropdownOpen}
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <ChevronDown
                size={16}
                className={`dark:text-[#D0CDEF] transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-14 w-48 bg-white dark:bg-[#24214A] rounded-md shadow-lg py-2 z-50 border dark:border-[#656092] transition-all duration-200 ease-in-out transform origin-top-right">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-[#656092]">
                  <p className="font-semibold text-gray-800 dark:text-[#D0CDEF]">
                    {userInfo?.user?.full_name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userInfo?.user?.email}
                  </p>
                </div>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-[#D0CDEF] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <RiHomeOfficeLine size={16} />
                  <Link to="/" onClick={() => setIsDropdownOpen(false)}>
                    Home
                  </Link>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-[#D0CDEF] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <User size={16} />
                  <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
                    Profile
                  </Link>
                </button>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
         </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 dark:bg-[#1D1B31] p-8">
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Modal for Logout Confirmation */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[3px] transition-opacity duration-300"
          aria-labelledby="logout-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white border border-white/20 dark:bg-[#24214A] rounded-lg shadow-lg p-6 w-full max-w-md transform transition-all duration-300 scale-100"
          >
            <h2
              id="logout-modal-title"
              className="text-lg font-semibold text-gray-800 dark:text-[#D0CDEF] mb-4"
            >
              Confirm Logout
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-[#1E1C3B] text-gray-800 dark:text-[#D0CDEF] hover:bg-gray-300 dark:hover:bg-[#2c1f52] rounded-md focus:outline-none focus:ring-2 focus:ring-[#271E88] transition-colors duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                onClick={handleLogoutConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;



