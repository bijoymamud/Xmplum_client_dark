import React from "react";
import { useForm } from "react-hook-form";
import { useDarkMood } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";


const Login = () => {
  const { register, handleSubmit } = useForm();
  const { darkMode } = useDarkMood();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen justify-center items-center">

      <div className="w-full md:w-1/2 dark:bg-[#181636]  min-h-screen flex flex-col justify-center items-center p-6 md:p-10">
  
        <h1 className="text-2xl md:text-3xl font-bold mt-6 dark:text-[#D0CDEF] text-gray-800 mb-10">
         Welcome back
        </h1>
       
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
        
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
           
           <Link 
           to='/email_verification'
           className="hover:underline"
           >
           Forget Password?{" "}
           </Link>
           
          </div>
          <button
            type="submit"
            className="w-full dark:bg-[#04021C] font-medium  hover:bg-gray-900 border border-[#3831A3]  p-3 rounded-md mt-3 dark:text-[#E2E0F5] text-gray-900 "
          >
           Login
          </button>
        </form>

        <div className="mt-7 flex items-center gap-2">
        <h1 className="dark:text-[#D0CDEF] text-gray-800">Don't have an account?</h1>
<button>
<Link 
to='/register'
className="px-8 py-3 rounded-full dark:bg-[#271E88] hover:bg-indigo-800 dark:text-[#D0CDEF] text-gray-800 font-medium">Sing Up</Link>

</button>
        </div>
       
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

export default Login;