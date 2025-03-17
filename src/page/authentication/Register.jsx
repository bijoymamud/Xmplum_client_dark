import React from "react";
import { useForm } from "react-hook-form";
import { useDarkMood } from "../../Context/ThemeContext";
import { FaGoogle } from "react-icons/fa";
import { GrApple } from "react-icons/gr";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { darkMode } = useDarkMood();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 dark:bg-[#181636]  min-h-screen flex flex-col justify-center items-center p-6 md:p-10">
        <button className="text-gray-500 dark:text-gray-400 text-sm self-start hover:text-gray-700 dark:hover:text-gray-200">
          ← Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold mt-6 dark:text-[#D0CDEF] text-gray-800">
          Welcome To Luxbot
        </h1>
        <p className="dark:text-[#D0CDEF] text-gray-800 font-medium text-lg mt-2 mb-6">Start Now !!!</p>
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-700  rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-700   rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-700   rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-sm dark:text-[#D0CDEF] text-gray-800 flex items-center justify-end">
            Already have an account?{" "}
            <span className="text-[#5784FF] dark:text-blue-400 cursor-pointer hover:underline ms-2 font-semibold">
              Login
            </span>
          </div>
          <button
            type="submit"
            className="w-full dark:bg-[#04021C] font-medium  hover:bg-gray-900 border border-[#3831A3]  p-3 rounded-md mt-3 dark:text-[#E2E0F5] text-gray-900 "
          >
            Register
          </button>
        </form>
        <p className="dark:text-[#CECBED] text-gray-800 my-3">Or sign up with...</p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="flex items-center justify-center gap-2 border border-[#3831A3] bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700">
            <FaGoogle className="text-lg dark:text-[#E2E0F5] text-gray-900 "/>
            <span className="text-base dark:text-[#E2E0F5] text-gray-900 ">Sign in with Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-md border border-[#3831A3]  hover:bg-gray-300 dark:hover:bg-gray-700">
            <GrApple className="text-lg dark:text-[#E2E0F5] text-gray-900 mb-1"/>
            <span className="text-base dark:text-[#E2E0F5] text-gray-900 "> Sign in with Apple</span>
          </button>
       
        </div>
      </div>

      {/* Right Section - Illustration */}
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

export default Register;