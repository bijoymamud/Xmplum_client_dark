// import React, { useState, useRef, useEffect } from "react";
// import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
// import {
//   Menu,
//   Plus,
//   Settings,
//   ChevronDown,
//   LogOut,
//   User,
//   Moon,
//   Sun,
//   Scale,
//   Home,
//   GraduationCap,
//   Trash2,
//   TimerReset,
//   CalendarSearch,
// } from "lucide-react";
// import { useDarkMood } from "../../Context/ThemeContext";
// import {
//   useBotListQuery,
//   useDeletePerticularChatMutation,
//   useLoggeInUserQuery,
//   usePerticularUserChatListQuery,
// } from "../../redux/features/baseApi";
// import { GoLaw } from "react-icons/go";
// import { useDispatch } from "react-redux";
// import { clearChatList } from "../../redux/state/sliceChatPage";
// import { RiHomeOfficeLine } from "react-icons/ri";
// import { toast } from "react-toastify";

// const MessageLayout = () => {
//   const { darkMode, setDarkMode } = useDarkMood();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const { data: userInfo } = useLoggeInUserQuery();
//   const { data: history } = usePerticularUserChatListQuery();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { data: bots } = useBotListQuery();
//   const [deletePerticularChat] = useDeletePerticularChatMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const dropdownRef = useRef(null);
//   const [chatsLast7Days, setChatsLast7Days] = useState([]);
// const [chatsLast30Days, setChatsLast30Days] = useState([]);
// // const [searchParams] = useSearchParams()

//   const toggleTheme = () => setDarkMode(!darkMode);
//   console.log(history)

//   const handleLogoutConfirm = () => {
//     console.log("Logging out...");
//     localStorage.removeItem("access_token"); 
//     localStorage.removeItem("refresh_token");

//     toast.success("Logged out successfully!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//     navigate("/login");
//     setIsModalOpen(false);
//   };

//   const handleChatClick = (chat) => {
//     dispatch(clearChatList());
//     navigate(`/chat?id=${chat.id}`);
//   };

//   const handleBotSelect = (id) => {
//     console.log("Selected bot ID:", id);
//     localStorage.setItem("bot_id", id);
//   };

//   //delete single chat

//   const handleDelete = async (chatId)=>{
//     console.log(chatId);

//     try {
//       const response = await deletePerticularChat(chatId).unwrap();
   

//       console.log("Deleted chat response", response);
//       toast.success("Chat deleted successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });

//     } catch (error) {
//       console.log("error", error);
//     }
//   }

//   //for date
//   useEffect(() => {
//     if (!history || history.length === 0) return;
  
//     const now = new Date();
//     const sevenDaysAgo = new Date(now);
//     sevenDaysAgo.setDate(now.getDate() - 7);
  
//     const thirtyDaysAgo = new Date(now);
//     thirtyDaysAgo.setDate(now.getDate() - 30);
  
//     const last7 = history.filter(chat => new Date(chat.created_at) >= sevenDaysAgo);
//     const last30 = history.filter(chat => new Date(chat.created_at) >= thirtyDaysAgo);
  
//     setChatsLast7Days(last7);
//     setChatsLast30Days(last30);
//   }, [history]);


//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarCollapsed ? "w-24" : "w-80"
//         } bg-white dark:bg-[#131221] border-r-2 dark:border-[#656092] border-gray-200 dark:text-[#D0CDEF] text-gray-800 flex flex-col transition-all duration-300`}
//       >
//         {/* Dynamic Bot Showing */}
//         <div className="p-4">
//           <div className="w-full flex flex-col gap-2">
//             {bots?.map((bot) => (
//               <button
//                 key={bot?.id}
//                 onClick={() => handleBotSelect(bot?.id)}
//                 className="flex items-center gap-2 border-2 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-3 transition-colors duration-200 cursor-pointer"
//               >
//                 <GoLaw size={24} />
//                 {!isSidebarCollapsed && <span>{bot?.name}</span>}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* New Chat Button */}
//         <div className="p-4">
//           <Link
//             to="/chat"
//             className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-3 transition-colors duration-200"
//             reloadDocument
//           >
//             <Plus size={20} />
//             {!isSidebarCollapsed && <span>New Chat</span>}
//           </Link>
//         </div>

//         {/* Chat History */}
//         <div className="flex-1">


// <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-2 ps-5 flex items-center gap-2 mt-5"><TimerReset size={24} /> Last 7 Days</h2>
// <div className="pe-5 mb-20">
//   {chatsLast7Days.map(chat => (
//     <div
//       key={chat.id}
//       className="group flex items-center justify-between px-4 py-1  hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//     >
//       <div
//         onClick={() => handleChatClick(chat)}
//         className="cursor-pointer text-sm text-gray-800 dark:text-[#9b96c5] truncate max-w-[85%]"
//       >
//         {chat.title}
//       </div>
//       <button
//         onClick={() => handleDelete(chat.id)}
//         className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition"
//         title="Delete chat"
//       >
//         <Trash2 size={16} className="dark:text-red-400 cursor-pointer" />
//       </button>
//     </div>
//   ))}
// </div>

// <h2 className="font-bold text-lg text-gray-800 dark:text-white mt-6 mb-2 ps-5 flex items-center gap-2"> <CalendarSearch size={22} />Last 30 Days</h2>
// <div className="pe-5">
//   {chatsLast30Days.map(chat => (
//     <div
//       key={chat.id}
//       className="group flex items-center justify-between px-4 py-1 rounded-mdhover:bg-gray-200 dark:hover:bg-gray-700 transition"
//     >
//       <div
//         onClick={() => handleChatClick(chat)}
//         className="cursor-pointer text-sm text-gray-800 dark:text-gray-100 truncate max-w-[85%]"
//       >
//         {chat.title}
//       </div>
//       <button
//         onClick={() => handleDelete(chat.id)}
//         className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition"
//         title="Delete chat"
//       >
//         <Trash2 size={16} className="dark:text-red-400 cursor-pointer" />
//       </button>
//     </div>
//   ))}
// </div>



//         </div>

//         {/* Sidebar Footer */}
//         <div className="p-4 border-t border-gray-200 dark:border-gray-800">
//           <button
//             className="w-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200"
//             onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
//           >
//             <Menu size={20} />
//             {!isSidebarCollapsed && <span>Toggle Sidebar</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="h-[82px] border-b border-gray-500 bg-white dark:bg-[#1B1744] flex items-center justify-end px-6">
//           {/* User Menu */}
//           <div className="relative" ref={dropdownRef}>
//             <button
//               className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               aria-label="Open user menu"
//               aria-expanded={isDropdownOpen}
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                 alt="User"
//                 className="w-10 h-10 rounded-full"
//               />
//               <ChevronDown
//                 size={16}
//                 className={`dark:text-[#D0CDEF] transition-transform duration-200 ${
//                   isDropdownOpen ? "rotate-180" : "rotate-0"
//                 }`}
//               />
//             </button>

//             {isDropdownOpen && (
//               <div
//                 className="absolute right-0 top-14 w-48 bg-white dark:bg-[#24214A] rounded-md shadow-lg py-2 z-50 border dark:border-[#656092] transition-all duration-200 ease-in-out transform origin-top-right ${
//                   isDropdownOpen
//                     ? 'opacity-100 scale-100'
//                     : 'opacity-0 scale-95 pointer-events-none'
//                 }"
//               >
//                 <div className="px-4 py-2 border-b border-gray-200 dark:border-[#656092]">
//                   <p className="font-semibold text-gray-800 dark:text-[#D0CDEF]">
//                     {userInfo?.user?.full_name}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {userInfo?.user?.email}
//                   </p>
//                 </div>
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-[#D0CDEF] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
//                   <RiHomeOfficeLine size={16} />
//                   <Link to="/" onClick={() => setIsDropdownOpen(false)}>
//                     Home
//                   </Link>
//                 </button>
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-[#D0CDEF] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
//                   <User size={16} />
//                   <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
//                     Profile
//                   </Link>
//                 </button>
//                 <button
//                   className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
//                   onClick={() => {
//                     setIsModalOpen(true);
//                     setIsDropdownOpen(false);
//                   }}
//                 >
//                   <LogOut size={16} />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 bg-gray-50 dark:bg-[#1D1B31] p-6">
//           <div className="max-w-7xl h-full mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       {/* Modal for Logout Confirmation */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-[3px] transition-opacity duration-300"
//           aria-labelledby="logout-modal-title"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div
//             className="bg-white border border-white/20 dark:bg-[#24214A] rounded-lg shadow-lg p-6 w-full max-w-md transform transition-all duration-300 scale-100"
//           >
//             <h2
//               id="logout-modal-title"
//               className="text-lg font-semibold text-gray-800 dark:text-[#D0CDEF] mb-4"
//             >
//               Confirm Logout
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Are you sure you want to log out?
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 dark:bg-[#1E1C3B] text-gray-800 dark:text-[#D0CDEF] hover:bg-gray-300 dark:hover:bg-[#2c1f52] rounded-md focus:outline-none focus:ring-2 focus:ring-[#271E88] transition-colors duration-200"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
//                 onClick={handleLogoutConfirm}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageLayout;


//2nd layout
// import React, { useState, useRef, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   Plus,
//   Settings,
//   ChevronDown,
//   LogOut,
//   User,
//   Moon,
//   Sun,
//   Scale,
//   Home,
//   GraduationCap,
//   Trash2,
//   TimerReset,
//   CalendarSearch,
// } from "lucide-react";
// import { useDarkMood } from "../../Context/ThemeContext";
// import {
//   useBotListQuery,
//   useDeletePerticularChatMutation,
//   useLoggeInUserQuery,
//   usePerticularUserChatListQuery,
// } from "../../redux/features/baseApi";
// import { GoLaw } from "react-icons/go";
// import { useDispatch } from "react-redux";
// import { clearChatList } from "../../redux/state/sliceChatPage";
// import { RiHomeOfficeLine } from "react-icons/ri";
// import { toast } from "react-toastify";

// const MessageLayout = () => {
//   const { darkMode, setDarkMode } = useDarkMood();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const { data: userInfo } = useLoggeInUserQuery();
//   const { data: history } = usePerticularUserChatListQuery();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { data: bots } = useBotListQuery();
//   const [deletePerticularChat] = useDeletePerticularChatMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const dropdownRef = useRef(null);
//   const [chatsLast7Days, setChatsLast7Days] = useState([]);
//   const [chatsLast30Days, setChatsLast30Days] = useState([]);
//   const [selectedChatId, setSelectedChatId] = useState(null); // Track selected chat

//   const toggleTheme = () => setDarkMode(!darkMode);

//   console.log("Chat history:", history);

//   const handleLogoutConfirm = () => {
//     console.log("Logging out...");
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     toast.success("Logged out successfully!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//     navigate("/login");
//     setIsModalOpen(false);
//   };

//   const handleChatClick = (chat) => {
//     if (chat.id === selectedChatId) {
//       console.log("Chat already selected:", chat.id);
//       return; // Prevent re-clicking
//     }
//     console.log("Selecting chat:", chat.id);
//     dispatch(clearChatList());
//     setSelectedChatId(chat.id);
//     navigate(`/chat?id=${chat.id}`);
//   };

//   const handleBotSelect = (id) => {
//     console.log("Selected bot ID:", id);
//     localStorage.setItem("bot_id", id);
//   };

//   const handleDelete = async (chatId) => {
//     console.log("Deleting chat:", chatId);
//     try {
//       const response = await deletePerticularChat(chatId).unwrap();
//       console.log("Deleted chat response:", response);
//       toast.success("Chat deleted successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//       if (chatId === selectedChatId) {
//         setSelectedChatId(null); // Clear selection if deleted
//       }
//     } catch (error) {
//       console.error("Delete chat error:", error);
//       toast.error("Failed to delete chat.", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   // Group chats by date
//   useEffect(() => {
//     if (!history || history.length === 0) return;

//     const now = new Date();
//     const sevenDaysAgo = new Date(now);
//     sevenDaysAgo.setDate(now.getDate() - 7);
//     const thirtyDaysAgo = new Date(now);
//     thirtyDaysAgo.setDate(now.getDate() - 30);

//     const last7 = history.filter(
//       (chat) => new Date(chat.created_at) >= sevenDaysAgo
//     );
//     const last30 = history.filter(
//       (chat) => new Date(chat.created_at) >= thirtyDaysAgo
//     );

//     setChatsLast7Days(last7);
//     setChatsLast30Days(last30);
//   }, [history]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Ensure a bot is selected for new chat
//   useEffect(() => {
//     if (bots?.length > 0 && !localStorage.getItem("bot_id")) {
//       console.log("Setting default bot ID:", bots[0].id);
//       localStorage.setItem("bot_id", bots[0].id);
//     }
//   }, [bots]);

//   return (
//     <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarCollapsed ? "w-24" : "w-80"
//         } bg-white dark:bg-[#131221] border-r-2 dark:border-[#656092] border-gray-200 dark:text-[#D0CDEF] text-gray-800 flex flex-col transition-all duration-300`}
//       >
//         {/* Dynamic Bot Showing */}
//         <div className="p-4">
//           <div className="w-full flex flex-col gap-2">
//             {bots?.map((bot) => (
//               <button
//                 key={bot?.id}
//                 onClick={() => handleBotSelect(bot?.id)}
//                 className="flex items-center gap-2 border-2 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-3 transition-colors duration-200 cursor-pointer"
//               >
//                 <GoLaw size={24} />
//                 {!isSidebarCollapsed && <span>{bot?.name}</span>}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* New Chat Button */}
//         <div className="p-4">
//           <Link
//             to="/chat"
//             className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-3 transition-colors duration-200"
//             onClick={() => {
//               setSelectedChatId(null); // Clear selected chat
//               dispatch(clearChatList()); // Clear messages
//             }}
//           >
//             <Plus size={20} />
//             {!isSidebarCollapsed && <span>New Chat</span>}
//           </Link>
//         </div>

//         {/* Chat History */}
//         <div className="flex-1">
//           <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-2 ps-5 flex items-center gap-2 mt-5">
//             <TimerReset size={24} /> Last 7 Days
//           </h2>
//           <div className="pe-5 mb-20">
//             {chatsLast7Days.map((chat) => (
//               <div
//                 key={chat.id}
//                 className={`group flex items-center justify-between px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
//                   chat.id === selectedChatId
//                     ? "opacity-50 cursor-not-allowed"
//                     : ""
//                 }`}
//                 aria-disabled={chat.id === selectedChatId}
//               >
//                 <div
//                   onClick={() => handleChatClick(chat)}
//                   className={`cursor-pointer text-sm text-gray-800 dark:text-[#9b96c5] truncate max-w-[85%] ${
//                     chat.id === selectedChatId ? "pointer-events-none" : ""
//                   }`}
//                 >
//                   {chat.title}
//                 </div>
//                 <button
//                   onClick={() => handleDelete(chat.id)}
//                   className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition"
//                   title="Delete chat"
//                   disabled={chat.id === selectedChatId}
//                 >
//                   <Trash2 size={16} className="dark:text-red-400 cursor-pointer" />
//                 </button>
//               </div>
//             ))}
//           </div>

//           <h2 className="font-bold text-lg text-gray-800 dark:text-white mt-6 mb-2 ps-5 flex items-center gap-2">
//             <CalendarSearch size={22} /> Last 30 Days
//           </h2>
//           <div className="pe-5">
//             {chatsLast30Days.map((chat) => (
//               <div
//                 key={chat.id}
//                 className={`group flex items-center justify-between px-4 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
//                   chat.id === selectedChatId
//                     ? "opacity-50 cursor-not-allowed"
//                     : ""
//                 }`}
//                 aria-disabled={chat.id === selectedChatId}
//               >
//                 <div
//                   onClick={() => handleChatClick(chat)}
//                   className={`cursor-pointer text-sm text-gray-800 dark:text-gray-100 truncate max-w-[85%] ${
//                     chat.id === selectedChatId ? "pointer-events-none" : ""
//                   }`}
//                 >
//                   {chat.title}
//                 </div>
//                 <button
//                   onClick={() => handleDelete(chat.id)}
//                   className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition"
//                   title="Delete chat"
//                   disabled={chat.id === selectedChatId}
//                 >
//                   <Trash2 size={16} className="dark:text-red-400 cursor-pointer" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Sidebar Footer */}
//         <div className="p-4 border-t border-gray-200 dark:border-gray-800">
//           <button
//             className="w-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors duration-200"
//             onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
//           >
//             <Menu size={20} />
//             {!isSidebarCollapsed && <span>Toggle Sidebar</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="h-[82px] border-b border-gray-500 bg-white dark:bg-[#1B1744] flex items-center justify-end px-6">
//           <div className="relative" ref={dropdownRef}>
//             <button
//               className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#271E88]"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               aria-label="Open user menu"
//               aria-expanded={isDropdownOpen}
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                 alt="User"
//                 className="w-10 h-10 rounded-full"
//               />
//               <ChevronDown
//                 size={16}
//                 className={`dark:text-[#D0CDEF] transition-transform duration-200 ${
//                   isDropdownOpen ? "rotate-180" : "rotate-0"
//                 }`}
//               />
//             </button>

//             {isDropdownOpen && (
//               <div className="absolute right-0 top-14 w-48 bg-white dark:bg-[#24214A] rounded-md shadow-lg py-2 z-50 border dark:border-[#656092] transition-all duration-200 ease-in-out transform origin-top-right">
//                 <div className="px-4 py-2 border-b border-gray-200 dark:border-[#656092]">
//                   <p className="font-semibold text-gray-800 dark:text-[#D0CDEF]">
//                     {userInfo?.user?.full_name}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {userInfo?.user?.email}
//                   </p>
//                 </div>
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-[#D0CDEF] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
//                   <RiHomeOfficeLine size={16} />
//                   <Link to="/" onClick={() => setIsDropdownOpen(false)}>
//                     Home
//                   </Link>
//                 </button>
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-[#D0CDEF] hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
//                   <User size={16} />
//                   <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
//                     Profile
//                   </Link>
//                 </button>
//                 <button
//                   className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
//                   onClick={() => {
//                     setIsModalOpen(true);
//                     setIsDropdownOpen(false);
//                   }}
//                 >
//                   <LogOut size={16} />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 bg-gray-50 dark:bg-[#1D1B31] p-6">
//           <div className="max-w-7xl h-full mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       {/* Modal for Logout Confirmation */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[3px] transition-opacity duration-300"
//           aria-labelledby="logout-modal-title"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div
//             className="bg-white border border-white/20 dark:bg-[#24214A] rounded-lg shadow-lg p-6 w-full max-w-md transform transition-all duration-300 scale-100"
//           >
//             <h2
//               id="logout-modal-title"
//               className="text-lg font-semibold text-gray-800 dark:text-[#D0CDEF] mb-4"
//             >
//               Confirm Logout
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Are you sure you want to log out?
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 dark:bg-[#1E1C3B] text-gray-800 dark:text-[#D0CDEF] hover:bg-gray-300 dark:hover:bg-[#2c1f52] rounded-md focus:outline-none focus:ring-2 focus:ring-[#271E88] transition-colors duration-200"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
//                 onClick={handleLogoutConfirm}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageLayout;




import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
  Trash2,
  TimerReset,
  CalendarSearch,
} from "lucide-react";
import { useDarkMood } from "../../Context/ThemeContext";
import {
  useBotListQuery,
  useDeletePerticularChatMutation,
  useLoggeInUserQuery,
  usePerticularUserChatListQuery,
} from "../../redux/features/baseApi";
import { GoLaw } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { clearChatList, setSelectedChatId } from "../../redux/state/sliceChatPage";
import { RiHomeOfficeLine } from "react-icons/ri";
import { toast } from "react-toastify";

const MessageLayout = () => {
  const { darkMode, setDarkMode } = useDarkMood();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { data: userInfo } = useLoggeInUserQuery();
  const { data: history } = usePerticularUserChatListQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: bots } = useBotListQuery();
  const [deletePerticularChat] = useDeletePerticularChatMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const selectedChatId = useSelector((state) => state.chatpage.selectedChatId);

  const toggleTheme = () => setDarkMode(!darkMode);

  console.log("Chat history:", history);

  const handleLogoutConfirm = () => {
    console.log("Logging out...");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/login");
    setIsModalOpen(false);
  };

  const handleChatClick = (chat) => {
    if (chat.id === selectedChatId) {
      console.log("Chat already selected:", chat.id);
      return;
    }
    console.log("Selecting chat:", chat.id);
    dispatch(clearChatList());
    dispatch(setSelectedChatId(chat.id));
    navigate(`/chat?id=${chat.id}`);
  };

  const handleBotSelect = (id) => {
    console.log("Selected bot ID:", id);
    localStorage.setItem("bot_id", id);
  };

  const handleDelete = async (chatId) => {
    console.log("Deleting chat:", chatId);
    try {
      const response = await deletePerticularChat(chatId).unwrap();
      console.log("Deleted chat response:", response);
      toast.success("Chat deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      if (chatId === selectedChatId) {
        dispatch(setSelectedChatId(null));
      }
    } catch (error) {
      console.error("Delete chat error:", error);
      toast.error("Failed to delete chat.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Group chats by date with useMemo for performance
  const chatsLast7Days = useMemo(() => {
    if (!history || history.length === 0) return [];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return history.filter((chat) => new Date(chat.created_at) >= sevenDaysAgo);
  }, [history]);

  const chatsLast30Days = useMemo(() => {
    if (!history || history.length === 0) return [];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return history.filter((chat) => new Date(chat.created_at) >= thirtyDaysAgo);
  }, [history]);

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

  // Ensure a bot is selected for new chat
  useEffect(() => {
    if (bots?.length > 0 && !localStorage.getItem("bot_id")) {
      console.log("Setting default bot ID:", bots[0].id);
      localStorage.setItem("bot_id", bots[0].id);
    }
  }, [bots]);

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-24" : "w-80"
        } bg-white dark:bg-[#131221] border-r-2 dark:border-[#656092] border-gray-200 dark:text-[#D0CDEF] text-gray-800 flex flex-col transition-all duration-300`}
      >
        {/* Dynamic Bot Showing */}
        <div className="p-4">
          <div className="w-full flex flex-col gap-2">
            {bots?.map((bot) => (
              <button
                key={bot?.id}
                onClick={() => handleBotSelect(bot?.id)}
                className="flex items-center gap-2 border-2 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-3 transition-colors duration-200 cursor-pointer"
              >
                <GoLaw size={24} />
                {!isSidebarCollapsed && <span>{bot?.name}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Link
            to="/chat"
            className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-3 transition-colors duration-200"
            onClick={() => {
              dispatch(setSelectedChatId(null));
              dispatch(clearChatList());
            }}
          >
            <Plus size={20} />
            {!isSidebarCollapsed && <span>New Chat</span>}
          </Link>
        </div>

        {/* Chat History */}
        <div className="flex-1">
          <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-2 ps-5 flex items-center gap-2 mt-5">
            <TimerReset size={24} /> Last 7 Days
          </h2>
          <div className="pe-5 mb-20 space-y-1">
            {chatsLast7Days.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center justify-between px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
                  chat.id === selectedChatId
                    ? "opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600"
                    : ""
                }`}
                aria-disabled={chat.id === selectedChatId}
                title={chat.id === selectedChatId ? "This chat is currently active" : ""}
              >
                <div
                  onClick={() => handleChatClick(chat)}
                  className={`cursor-pointer text-sm text-gray-800 dark:text-[#9b96c5] truncate max-w-[85%] ${
                    chat.id === selectedChatId ? "pointer-events-none" : ""
                  }`}
                >
                  {chat.title}
                </div>
                <button
                  onClick={() => handleDelete(chat.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition"
                  title="Delete chat"
                  disabled={chat.id === selectedChatId}
                >

                </button>
              </div>
            ))}
          </div>

          <h2 className="font-bold text-lg text-gray-800 dark:text-white mt-6 mb-2 ps-5 flex items-center gap-2">
            <CalendarSearch size={22} /> Last 30 Days
          </h2>
          <div className="pe-5 space-y-1">
            {chatsLast30Days.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center justify-between px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
                  chat.id === selectedChatId
                    ? "opacity-50 cursor-not-allowed bg-gray-300 dark:bg-gray-600"
                    : ""
                }`}
                aria-disabled={chat.id === selectedChatId}
                title={chat.id === selectedChatId ? "This chat is currently active" : ""}
              >
                <div
                  onClick={() => handleChatClick(chat)}
                  className={`cursor-pointer text-sm text-gray-800 dark:text-gray-100 truncate max-w-[85%] ${
                    chat.id === selectedChatId ? "pointer-events-none" : ""
                  }`}
                >
                  {chat.title}
                </div>
                <button
                  onClick={() => handleDelete(chat.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition"
                  title="Delete chat"
                  disabled={chat.id === selectedChatId}
                >
                </button>
              </div>
            ))}
          </div>
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
        <header className="h-[82px] border-b border-gray-500 bg-white dark:bg-[#1B1744] flex items-center justify-end px-6">
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
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 dark:bg-[#1D1B31] p-6">
          <div className="max-w-7xl h-full mx-auto">
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

export default MessageLayout;




