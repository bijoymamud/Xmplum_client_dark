



import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  Plus,
  Settings,
  ChevronDown,
  LogOut,
  User,
  Moon,
  Sun,
  Scale,
  Home,
  GraduationCap,
} from "lucide-react";
import { useDarkMood } from "../../Context/ThemeContext";
// Import your ThemeContext hook

const MessageLayout = () => {
  
    const { darkMode } = useDarkMood();// Use theme from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedBot, setSelectedBot] = useState("law");
  const [isBotDropdownOpen, setBotDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const bots = [
    { id: "law", name: "Law Bot", icon: Scale, description: "Legal assistance and advice" },
    { id: "realstate", name: "Real Estate Bot", icon: Home, description: "Property and real estate guidance" },
    { id: "primary", name: "Primary School Bot", icon: GraduationCap, description: "Educational support for primary students" },
  ];

  const selectedBotData = bots.find((bot) => bot.id === selectedBot);
  const Icon = selectedBotData?.icon || Scale;

  const history = [
    { id: 1, title: "Website Development Discussion", time: "10:30 AM" },
    { id: 2, title: "UI/UX Design Review", time: "Yesterday" },
    { id: 3, title: "Project Timeline Planning", time: "2 days ago" },
    { id: 4, title: "API Integration Meeting", time: "3 days ago" },
    { id: 5, title: "Code Review Session", time: "4 days ago" },
  ];

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogoutConfirm = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    navigate("/login");
    setIsModalOpen(false);
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-24" : "w-80"
        } bg-white dark:bg-[#131221] border-r-2 dark:border-[#656092] border-gray-200 dark:text-[#D0CDEF] text-gray-800 flex flex-col`}
      >
        {/* Bot Selection Dropdown */}
        <div className="p-4 mt-5">
          <div className="border-2 border-gray-200 dark:border-[#656092] rounded-lg p-3">
            <div className="relative">
              <button
                className="w-full flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setBotDropdownOpen(!isBotDropdownOpen)}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  {!isSidebarCollapsed && (
                    <div className="text-left">
                      <div className="font-medium">{selectedBotData?.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedBotData?.description}
                      </div>
                    </div>
                  )}
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isBotDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isBotDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-1 z-10">
                  {bots.map((bot) => {
                    const BotIcon = bot.icon;
                    return (
                      <button
                        key={bot.id}
                        className={`w-full flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                          selectedBot === bot.id
                            ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedBot(bot.id);
                          setBotDropdownOpen(false);
                        }}
                      >
                        <BotIcon size={20} />
                        {!isSidebarCollapsed && (
                          <div className="text-left">
                            <div className="font-medium">{bot.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {bot.description}
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-3 transition-colors duration-200"
            onClick={() => {/* Handle new chat */}}
          >
            <Plus size={20} />
            {!isSidebarCollapsed && <span>New Chat</span>}
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          <h1 className="p-3 text-xl font-semibold">History:</h1>
          {history.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
            >
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{chat.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</p>
                </div>
              )}
            </div>
          ))}
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
        <header className="h-[82px] border-gray-200 bg-white dark:bg-[#1B1744] flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold dark:text-[#D0CDEF] text-gray-800">
            Messages
          </h1>

          {/* User Menu */}
          <div className="relative">
            <button
              className="flex items-center gap-2 p-2 transition-colors duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <ChevronDown size={16} className="dark:text-[#D0CDEF]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 dark:bg-[#24214A] bg-white rounded-[5px] dark:shadow-gray-700 border dark:border-gray-800 py-1">
                <div className="px-4 py-2 dark:border-b border-[#D0CDEF]">
                  <p className="font-medium dark:text-[#D0CDEF]">John Doe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    john@example.com
                  </p>
                </div>
                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-[#D0CDEF] transition-colors duration-200">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-[#D0CDEF] transition-colors duration-200">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-[#D0CDEF] transition-colors duration-200"
                  onClick={toggleTheme}
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-600 text-red-600 transition-colors duration-200"
                  onClick={() => setIsModalOpen(true)}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 dark:bg-[#1D1B31] p-6 overflow-y-auto">
          <div className="max-w-4xl h-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Modal for Logout Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] bg-opacity-50 z-50">
          <div className="bg-white dark:bg-[#24214A] rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold dark:text-[#D0CDEF] text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:text-[#D0CDEF] text-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
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

export default MessageLayout;