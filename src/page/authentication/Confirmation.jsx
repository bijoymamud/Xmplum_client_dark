import React from "react";
import { useDarkMood } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";


const Confirmation = () => {
  
  const { darkMode } = useDarkMood();

  return (
    <div className="flex min-h-screen justify-center items-center">

      <div className="w-full md:w-1/2 dark:bg-[#181636]  min-h-screen flex flex-col justify-center items-center p-6 md:p-10">
  

            <img src="https://i.ibb.co.com/bg6NnDkj/check.png" alt="" className="w-1/8" />

        <h1 className="text-2xl md:text-3xl font-bold mt-6 dark:text-[#D0CDEF] text-gray-800 mb-10">
         Password Changed Successully
        </h1>

       <Link 
       to='/login'
       >
       <button className="flex px-5 p-3 rounded-full cursor-pointer items-center gap-2 dark:text-[#D0CDEF] text-gray-800 hover:dark:bg-indigo-700 dark:bg-[#1E5DCC] bg-white border dark:border-[#3831A3] ">
        <MdOutlineKeyboardBackspace className="text-2xl"/>
        Back to Login
        </button>
       </Link>
       
      </div>

  
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center dark:bg-[#14122B] min-h-screen p-10 text-center">
        <h2 className="text-lg md:text-xl font-semibold dark:text-[#D0CDEF] text-gray-800 w-1/3 mb-10">
        Understanding 
the Legal System,
 Your Rights and Responsibilities
        </h2>
    
        <img
          src="https://i.ibb.co.com/xSCND5zj/Group-1597883253.png"
          alt="AI Bot Illustration"
          className="w-1/2 mb-6"
        />
        <p className="dark:text-[#D0CDEF] text-gray-800">Protecting Rights, Property, and the Future</p>
      </div>
    </div>
  );
};

export default Confirmation;