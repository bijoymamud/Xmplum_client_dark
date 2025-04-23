import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  RiMenu3Line,
  RiCloseLine,
  RiArrowDownSLine,
  RiLoginBoxLine,
  RiUserAddLine,
  RiSunLine,
  RiMoonLine,
  RiUserLine,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { useDarkMood } from '../../Context/ThemeContext';
import { useLoggeInUserQuery } from '../../redux/features/baseApi';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMood();
  const { data: loggedInUser, isLoading } = useLoggeInUserQuery();
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target) && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
    });
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const dropdownItems = [
    {
      name: 'Logout',
      path: '#',
      icon: RiLogoutBoxLine,
      onClick: () => {
        toggleModal();
        setIsDropdownOpen(false);
      },
    },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-white dark:bg-[#221F42] py-4 shadow-md transition-shadow duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-2 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-3" aria-label="Brand Home">
              <img
                className="h-16 md:w-[70px] rounded-lg shadow-lg"
                src="https://i.ibb.co.com/s9CpmcJD/Chatbot-Message-Bubble-removebg-preview.png"
                alt="Brand Logo"
              />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-200"></span>
            </NavLink>
          </div>

          {/* Navigation Links - Center (Desktop) */}
          <div className="hidden md:flex items-center justify-center flex-1 ml-10">
            <div className="flex space-x-2" role="menubar">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full md:px-10 text-lg font-medium flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-[#271E88] ${
                      isActive
                        ? 'bg-[#271E88] text-[#D0CDEF] shadow-md'
                        : 'text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                    }`
                  }
                  role="menuitem"
                  aria-label={link.name}
                >
                  <span>{link.name}</span>
                  {link.name === 'Services' && <RiArrowDownSLine className="w-4 h-4 ml-1" />}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Side - Desktop Layout */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full transition-colors duration-200 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <RiSunLine className="w-6 h-6" /> : <RiMoonLine className="w-6 h-6" />}
            </button>

            {/* Auth Buttons or Avatar */}
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            ) : loggedInUser ? (
              <div className="relative avatar flex items-center gap-2" role="group" aria-label="User profile" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#271E88]"
                  aria-label="Open user menu"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt={`${loggedInUser?.full_name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                </button>
                {/* {isDropdownOpen && (
                  <div className="absolute right-0 top-14 w-48 bg-white dark:bg-[#221F42] rounded-md shadow-lg py-2 z-50 animate-dropdown border border-gray-400">
                    {dropdownItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={item.onClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 text-left"
                        role="menuitem"
                        aria-label={item.name}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                )} */}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button>
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-1 px-6 py-2 rounded-full text-lg font-medium text-white bg-[#271E88] hover:bg-indigo-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
                    aria-label="Login"
                  >
                    <RiLoginBoxLine className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </button>
                <button>
                  <Link
                    to="/register"
                    className="flex bg-[#271E88] items-center space-x-1 px-6 py-2 rounded-full text-lg font-medium text-white transition-all duration-200 hover:bg-indigo-800 shadow-md focus:outline-none focus:ring-2 focus:ring-[#271E88]"
                    aria-label="Sign Up"
                  >
                    <RiUserAddLine className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Mobile Layout */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full transition-colors duration-200 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <RiSunLine className="w-6 h-6" /> : <RiMoonLine className="w-6 h-6" />}
            </button>

            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            ) : loggedInUser ? (
              <div className="relative avatar flex items-center gap-2" role="group" aria-label="User profile" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#271E88]"
                  aria-label="Open user menu"
                  aria-expanded={isDropdownOpen}
                >
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt={`${loggedInUser?.full_name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white dark:bg-[#221F42] rounded-md shadow-lg py-2 z-50 animate-dropdown border border-gray-400">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={item.onClick || (() => setIsDropdownOpen(false))}
                        className="flex items-center px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                        role="menuitem"
                        aria-label={item.name}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button>
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-1 px-4 py-1 rounded-full text-sm font-medium text-white bg-[#271E88] hover:bg-indigo-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
                    aria-label="Login"
                  >
                    <RiLoginBoxLine className="md:w-4 md:h-4 hidden md:block" />
                    <span>Login</span>
                  </Link>
                </button>
                <button>
                  <Link
                    to="/register"
                    className="flex bg-[#271E88] items-center space-x-1 px-4 py-1 rounded-full text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-800 shadow-md focus:outline-none focus:ring-2 focus:ring-[#271E88]"
                    aria-label="Sign Up"
                  >
                    <RiUserAddLine className="md:w-4 md:h-4 hidden md:block" />
                    <span>Sign Up</span>
                  </Link>
                </button>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors duration-200 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-[#221F42] px-2 pt-2 pb-3 space-y-1 animate-slide-down">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-[#271E88] ${
                    isActive
                      ? 'bg-[#271E88] text-[#D0CDEF]'
                      : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`
                }
                onClick={() => setIsOpen(false)}
                role="menuitem"
                aria-label={link.name}
              >
                <span>{link.name}</span>
              </NavLink>
            ))}
            {!loggedInUser && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
                  onClick={() => setIsOpen(false)}
                  aria-label="Login"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
                  onClick={() => setIsOpen(false)}
                  aria-label="Sign Up"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Custom Logout Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[3px] transition-opacity duration-300"
          aria-labelledby="logout-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={modalRef}
            className="bg-white dark:bg-[#221F42] border border-white/20 rounded-lg shadow-lg p-6 w-full max-w-xl py-6 transform transition-all duration-300 scale-100"
          >
            <h3
              id="logout-modal-title"
              className="text-2xl font-bold text-gray-900 dark:text-[#D0CDEF] mb-2"
            >
              Confirm Logout
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-gray-900 dark:text-gray-300 bg-gray-200 dark:bg-[#1E1C3B] hover:bg-gray-300 dark:hover:bg-[#2c1f52] rounded-md focus:outline-none focus:ring-2 focus:ring-[#271E88] transition-colors duration-200"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;




// import React, { useState, useEffect, useRef } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import {
//   RiMenu3Line,
//   RiCloseLine,
//   RiArrowDownSLine,
//   RiLoginBoxLine,
//   RiUserAddLine,
//   RiSunLine,
//   RiMoonLine,
//   RiUserLine,
//   RiLogoutBoxLine,
// } from 'react-icons/ri';
// import { useDarkMood } from '../../Context/ThemeContext';
// import { useLoggeInUserQuery } from '../../redux/features/baseApi';
// import { toast } from 'react-toastify';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { darkMode, setDarkMode } = useDarkMood();
//   const { data: loggedInUser, isLoading } = useLoggeInUserQuery();
//   const dropdownRef = useRef(null);
//   const modalRef = useRef(null);
//   const navigate = useNavigate();

//   const toggleDarkMode = () => setDarkMode(!darkMode);
//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//       if (modalRef.current && !modalRef.current.contains(event.target) && isModalOpen) {
//         setIsModalOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isModalOpen]);

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     toast.success('Logged out successfully!', {
//       position: 'top-right',
//       autoClose: 2000,
//     });
//     setIsModalOpen(false);
//     setIsDropdownOpen(false);
//     navigate('/login');
//   };

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   const dropdownItems = [
//     {
//       name: 'Logout',
//       path: '#',
//       icon: RiLogoutBoxLine,
//       onClick: () => {
//         toggleModal();
//         setIsDropdownOpen(false);
//       },
//     },
//   ];

//   return (
//     <nav
//       className="sticky top-0 z-50 bg-white dark:bg-[#221F42] py-4 shadow-md transition-shadow duration-300"
//       role="navigation"
//       aria-label="Main navigation"
//     >
//       <div className="container mx-auto px-2 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo - Left Side */}
//           <div className="flex-shrink-0">
//             <NavLink to="/" className="flex items-center space-x-3" aria-label="Brand Home">
//               <img
//                 className="h-16 md:w-[70px] rounded-lg shadow-lg"
//                 src="https://i.ibb.co.com/s9CpmcJD/Chatbot-Message-Bubble-removebg-preview.png"
//                 alt="Brand Logo"
//               />
//               <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-200"></span>
//             </NavLink>
//           </div>

//           {/* Navigation Links - Center (Desktop) */}
//           <div className="hidden md:flex items-center justify-center flex-1 ml-10">
//             <div className="flex space-x-2" role="menubar">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.name}
//                   to={link.path}
//                   className={({ isActive }) =>
//                     `px-4 py-2 rounded-full md:px-10 text-lg font-medium flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-[#271E88] ${
//                       isActive
//                         ? 'bg-[#271E88] text-[#D0CDEF] shadow-md'
//                         : 'text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
//                     }`
//                   }
//                   role="menuitem"
//                   aria-label={link.name}
//                 >
//                   <span>{link.name}</span>
//                   {link.name === 'Services' && <RiArrowDownSLine className="w-4 h-4 ml-1" />}
//                 </NavLink>
//               ))}
//             </div>
//           </div>

//           {/* Right Side - Desktop Layout */}
//           <div className="hidden md:flex items-center space-x-2">
//             <button
//               onClick={toggleDarkMode}
//               className="p-2 rounded-full transition-colors duration-200 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//               aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//               title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//             >
//               {darkMode ? <RiSunLine className="w-6 h-6" /> : <RiMoonLine className="w-6 h-6" />}
//             </button>

//             {/* Auth Buttons or Avatar */}
//             {isLoading ? (
//               <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
//             ) : loggedInUser ? (
//               <div className="relative avatar flex items-center gap-2" role="group" aria-label="User profile" ref={dropdownRef}>
//                 <button
//                   onClick={toggleDropdown}
//                   className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//                   aria-label="Open user menu"
//                   aria-expanded={isDropdownOpen}
//                 >
//                   <img
//                     src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                     alt={`${loggedInUser?.full_name}'s avatar`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 top-14 w-48 bg-white dark:bg-[#221F42] rounded-md shadow-lg py-2 z-50 animate-dropdown border border-gray-400">
//                     {dropdownItems.map((item) => (
//                       <Link
//                         key={item.name}
//                         to={item.path}
//                         onClick={item.onClick || (() => setIsDropdownOpen(false))}
//                         className="flex items-center px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
//                         role="menuitem"
//                         aria-label={item.name}
//                       >
//                         <item.icon className="w-4 h-4 mr-2" />
//                         <span>{item.name}</span>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <button>
//                   <Link
//                     to="/login"
//                     className="flex items-center justify-center space-x-1 px-6 py-2 rounded-full text-lg font-medium text-white bg-[#271E88] hover:bg-indigo-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//                     aria-label="Login"
//                   >
//                     <RiLoginBoxLine className="w-4 h-4" />
//                     <span>Login</span>
//                   </Link>
//                 </button>
//                 <button>
//                   <Link
//                     to="/register"
//                     className="flex bg-[#271E88] items-center space-x-1 px-6 py-2 rounded-full text-lg font-medium text-white transition-all duration-200 hover:bg-indigo-800 shadow-md focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//                     aria-label="Sign Up"
//                   >
//                     <RiUserAddLine className="w-4 h-4" />
//                     <span>Sign Up</span>
//                   </Link>
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Right Side - Mobile Layout */}
//           <div className="md:hidden flex items-center space-x-2">
//             <button
//               onClick={toggleDarkMode}
//               className="p-2 rounded-full transition-colors duration-200 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//               aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//               title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
//             >
//               {darkMode ? <RiSunLine className="w-6 h-6" /> : <RiMoonLine className="w-6 h-6" />}
//             </button>

//             {isLoading ? (
//               <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
//             ) : loggedInUser ? (
//               <div className="relative avatar flex items-center gap-2" role="group" aria-label="User profile" ref={dropdownRef}>
//                 <button
//                   onClick={toggleDropdown}
//                   className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//                   aria-label="Open user menu"
//                   aria-expanded={isDropdownOpen}
//                 >
//                   <img
//                     src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                     alt={`${loggedInUser?.full_name}'s avatar`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 top-12 w-48 bg-white dark:bg-[#221F42] rounded-md shadow-lg py-2 z-50 animate-dropdown border border-gray-400">
//                     {dropdownItems.map((item) => (
//                       <Link
//                         key={item.name}
//                         to={item.path}
//                         onClick={item.onClick || (() => setIsDropdownOpen(false))}
//                         className="flex items-center px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
//                         role="menuitem"
//                         aria-label={item.name}
//                       >
//                         <item.icon className="w-4 h-4 mr-2" />
//                         <span>{item.name}</span>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <button>
//                   <Link
//                     to="/login"
//                     className="flex items-center justify-center space-x-1 px-4 py-1 rounded-full text-sm font-medium text-white bg-[#271E88] hover:bg-indigo-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//                     aria-label="Login"
//                   >
//                     <RiLoginBoxLine className="md:w-4 md:h-4 hidden md:block" />
//                     <span>Login</span>
//                   </Link>
//                 </button>
//                 <button>
//                   <Link
//                     to="/register"
//                     className="flex bg-[#271E88] items-center space-x-1 px-4 py-1 rounded-full text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-800 shadow-md focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//                     aria-label="Sign Up"
//                   >
//                     <RiUserAddLine className="md:w-4 md:h-4 hidden md:block" />
//                     <span>Sign Up</span>
//                   </Link>
//                 </button>
//               </div>
//             )}

//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 rounded-lg transition-colors duration-200 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//               aria-label={isOpen ? 'Close menu' : 'Open menu'}
//               aria-expanded={isOpen}
//             >
//               {isOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden bg-white dark:bg-[#221F42] px-2 pt-2 pb-3 space-y-1 animate-slide-down">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-[#271E88] ${
//                     isActive
//                       ? 'bg-[#271E88] text-[#D0CDEF]'
//                       : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
//                   }`
//                 }
//                 onClick={() => setIsOpen(false)}
//                 role="menuitem"
//                 aria-label={link.name}
//               >
//                 <span>{link.name}</span>
//               </NavLink>
//             ))}
//             {!loggedInUser && (
//               <>
//                 <Link
//                   to="/login"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//                   onClick={() => setIsOpen(false)}
//                   aria-label="Login"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//                   onClick={() => setIsOpen(false)}
//                   aria-label="Sign Up"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Custom Logout Modal */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[3px] transition-opacity duration-300"
//           aria-labelledby="logout-modal-title"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div
//             ref={modalRef}
//             className="bg-white dark:bg-[#221F42] border border-white/20 rounded-lg shadow-lg p-6 w-full max-w-xl py-6 transform transition-all duration-300 scale-100"
//           >
//             <h3
//               id="logout-modal-title"
//               className="text-2xl font-bold text-gray-900 dark:text-[#D0CDEF] mb-2"
//             >
//               Confirm Logout
//             </h3>
//             <p className="text-gray-700 dark:text-gray-300 mb-6">
//               Are you sure you want to log out?
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={toggleModal}
//                 className="px-4 py-2 text-gray-900 dark:text-gray-300 bg-gray-200 dark:bg-[#1E1C3B] hover:bg-gray-300 dark:hover:bg-[#2c1f52] rounded-md focus:outline-none focus:ring-2 focus:ring-[#271E88] transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;  