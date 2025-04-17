



// import React, { useState } from 'react';

// import { Link, NavLink } from 'react-router-dom';
// import {
//   RiMenu3Line,
//   RiCloseLine,
//   RiArrowDownSLine,
//   RiLoginBoxLine,
//   RiUserAddLine,
//   RiSunLine,
//   RiMoonLine,
// } from 'react-icons/ri';
// import { useDarkMood } from '../../Context/ThemeContext';
// import { useLoggeInUserQuery } from '../../redux/features/baseApi';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { darkMode, setDarkMode } = useDarkMood();
//   const { data: loggedInUser, isLoading } = useLoggeInUserQuery();

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'About', path: '/about' },
//     { name: 'Contact', path: '/contact' },
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
//                 className="h-16 w-[70px] rounded-lg shadow-lg"
//                 src="https://i.ibb.co.com/s9CpmcJD/Chatbot-Message-Bubble-removebg-preview.png"
//                 alt="Brand Logo"
//               />
//               <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-200">
            
//               </span>
//             </NavLink>
//           </div>

//           {/* Navigation Links - Center */}
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

//           {/* Right Side - Dark Mode Toggle and Auth/Avatar */}
//           <div className="flex items-center space-x-2">
//             {/* Dark Mode Toggle Button */}
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
//               <div className="avatar flex items-center gap-2" role="group" aria-label="User profile">
//                 <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
//                   <img
//                     src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                     alt={`${loggedInUser?.full_name}'s avatar`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
             
//               </div>
//             ) : (
//               <div className="hidden md:flex items-center space-x-2">
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

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 rounded-lg transition-colors duration-200 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//             aria-label={isOpen ? 'Close menu' : 'Open menu'}
//             aria-expanded={isOpen}
//           >
//             {isOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
//           </button>
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
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  RiMenu3Line,
  RiCloseLine,
  RiArrowDownSLine,
  RiLoginBoxLine,
  RiUserAddLine,
  RiSunLine,
  RiMoonLine,
  RiUserLine,
  RiSettingsLine,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { useDarkMood } from '../../Context/ThemeContext';
import { useLoggeInUserQuery } from '../../redux/features/baseApi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMood();
  const { data: loggedInUser, isLoading } = useLoggeInUserQuery();
  const dropdownRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const dropdownItems = [
    { name: 'Profile', path: '/profile', icon: RiUserLine },
    { name: 'Settings', path: '/settings', icon: RiSettingsLine },
    { name: 'Logout', path: '/logout', icon: RiLogoutBoxLine },
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
                className="h-16 w-[70px] rounded-lg shadow-lg"
                src="https://i.ibb.co.com/s9CpmcJD/Chatbot-Message-Bubble-removebg-preview.png"
                alt="Brand Logo"
              />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-200"></span>
            </NavLink>
          </div>

          {/* Navigation Links - Center */}
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

          {/* Right Side - Dark Mode Toggle and Auth/Avatar */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle Button */}
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
                >
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt={`${loggedInUser?.full_name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-14 w-48 bg-white dark:bg-[#221F42] rounded-md shadow-lg py-2 z-50 animate-dropdown">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                        onClick={() => setIsDropdownOpen(false)}
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
              <div className="hidden md:flex items-center space-x-2">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-200 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
          </button>
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
    </nav>
  );
};

export default Navbar;