


// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { 
//   RiMenu3Line, RiCloseLine, RiArrowDownSLine, 
//   RiLoginBoxLine, RiUserAddLine, RiHomeSmileLine, 
//   RiSunLine, RiMoonLine 
// } from 'react-icons/ri';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem('theme') === 'dark' || false
//   );

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   const navLinks = [
//     { name: 'Home', path: '/', icon: RiHomeSmileLine },
//     { name: 'About', path: '/about' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   return (
//     <nav className="fixed w-full z-50 bg-[#221F42] py-4 dark:bg-white">
//       <div className="container mx-auto px-2 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo - Left Side */}
//           <div className="flex-shrink-0">
//             <NavLink to="/" className="flex items-center space-x-3">
//               <img 
//                 className="h-10 w-10 rounded-lg shadow-lg" 
//                 src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop&auto=format" 
//                 alt="Logo"
//               />
//               <span className="font-bold text-xl tracking-tight text-white dark:text-gray-200">
//                 Brand
//               </span>
//             </NavLink>
//           </div>

//           {/* Navigation Links - Center */}
//           <div className="hidden md:flex items-center justify-center flex-1 ml-10">
//             <div className="flex space-x-2">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.name}
//                   to={link.path}
//                   className={({ isActive }) =>
//                     `px-4 py-2 rounded-full md:px-10 text-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
//                       isActive 
//                         ? 'bg-[#271E88] text-[#D0CDEF] dark:text-white shadow-md' 
//                         : 'text-white/90 dark:text-gray-300 hover:text-white hover:bg-white/10'
//                     }`
//                   }
//                 >
//                   <span>{link.name}</span>
//                   {link.name === 'Services' && <RiArrowDownSLine className="w-4 h-4 ml-1" />}
//                 </NavLink>
//               ))}
//             </div>
//           </div>

//           {/* Dark Mode Toggle Button */}
//           <button 
//             onClick={toggleDarkMode} 
//             className="p-2 rounded-lg transition-colors duration-200 text-gray-300 hover:bg-gray-700"
//           >
//             {darkMode ? <RiSunLine className="w-6 h-6" /> : <RiMoonLine className="w-6 h-6" />}
//           </button>

//           {/* Auth Buttons - Right Side */}
//           <div className="hidden md:flex items-center space-x-2">
//             <button 
//               className="flex items-center justify-center space-x-1 px-4 py-2 rounded-full text-lg font-medium text-white/90 hover:text-white bg-[#271E88] hover:bg-indigo-700 transition-all duration-200"
//             >
//               <RiLoginBoxLine className="w-4 h-4" />
//               <span>Login</span>
//             </button>
//             <button className="flex bg-[#271E88] items-center space-x-1 px-4 py-2 rounded-full text-lg font-medium  text-white transition-all duration-200 hover:bg-indigo-700 shadow-md">
//               <RiUserAddLine className="w-4 h-4" />
//               <span>Sign Up</span>
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 rounded-lg transition-colors duration-200 text-white hover:bg-white/10"
//           >
//             {isOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-[#221F42] px-2 dark:bg-gray-900">
//           <div className="pt-2 pb-3 space-y-1">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `block px-4 py-2 rounded-full text-base font-medium transition-all duration-200 ${
//                     isActive 
//                       ? 'bg-[#271E88] text-[#D0CDEF] shadow-md' 
//                       : 'text-white/90 hover:text-white hover:bg-white/10'
//                   }`
//                 }
//                 onClick={() => setIsOpen(false)}
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//             <div className="space-y-2 mt-4">
//               <button className="w-full flex items-center justify-center space-x-1 px-4 py-2 rounded-full text-base bg-[#271E88] font-medium  hover:text-white transition-all text-[#D0CDEF]  duration-200">
//                 <RiLoginBoxLine className="w-4 h-4" />
//                 <span>Login</span>
//               </button>
//               <button className="w-full flex items-center justify-center space-x-1 px-4 py-2 rounded-full text-base font-medium bg-[#271E88] text-[#D0CDEF]  transition-all duration-200 hover:bg-indigo-700 shadow-md">
//                 <RiUserAddLine className="w-4 h-4" />
//                 <span>Sign Up</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  RiMenu3Line, RiCloseLine, RiArrowDownSLine, 
  RiLoginBoxLine, RiUserAddLine, RiHomeSmileLine, 
  RiSunLine, RiMoonLine 
} from 'react-icons/ri';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navLinks = [
    { name: 'Home', path: '/', icon: RiHomeSmileLine },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-[#221F42] py-4">
      <div className="container mx-auto px-2 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-3">
              <img 
                className="h-10 w-10 rounded-lg shadow-lg" 
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop&auto=format" 
                alt="Logo"
              />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-200">
                Brand
              </span>
            </NavLink>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center justify-center flex-1 ml-10">
            <div className="flex space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full md:px-10 text-lg font-medium flex items-center space-x-1 ${
                      isActive 
                        ? 'bg-[#271E88] text-[#D0CDEF] shadow-md' 
                        : 'text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.name === 'Services' && <RiArrowDownSLine className="w-4 h-4 ml-1" />}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle Button */}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full transition-colors duration-200 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 me-2"
          >
            {darkMode ? <RiSunLine className="w-6 h-6" /> : <RiMoonLine className="w-6 h-6" />}
          </button>

          {/* Auth Buttons - Right Side */}
          <div className="hidden md:flex items-center space-x-2">
            <button 
              className="flex items-center justify-center space-x-1 px-6 py-2 rounded-full text-lg font-medium text-white bg-[#271E88] hover:bg-indigo-800 transition-all duration-200"
            >
              <RiLoginBoxLine className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button className="flex bg-[#271E88] items-center space-x-1 px-6 py-2 rounded-full text-lg font-medium text-white transition-all duration-200 hover:bg-indigo-800 shadow-md">
              <RiUserAddLine className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-200 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
          >
            {isOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
