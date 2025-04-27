
import React from "react";
import { useForm } from "react-hook-form";
import { useDarkMood } from "../../Context/ThemeContext";
import { FaGoogle } from "react-icons/fa";
import { GrApple } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../redux/features/baseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { darkMode } = useDarkMood();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (userData) => {
    try {
      const response = await createUser(userData).unwrap();
      console.log("Registration Success:", response);

      localStorage.setItem("email", userData?.email);

      toast.success("Registration successful! Please verify your email.", {
        position: "top-right",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
      });

      navigate("/verify_signup");
    } catch (err) {
      console.error("Error creating user:", err);

      let message = "Failed to register. Please try again.";
      if (err?.data?.email && err.data.email.includes("already exists")) {
        message = "Email already exists.";
      } else if (err?.data?.message) {
        message = err.data.message;
      } else if (err?.message) {
        message = err.message;
      }

      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      {/* Toast Container with higher z-index */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme={darkMode ? "dark" : "light"}
        className="z-[9999]"
      />

     
      <style>{`
        .custom-spinner {
          width: 1.5rem;
          height: 1.5rem;
          border: 3px solid #ffffff;
          border-top: 3px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div
        className={`w-full md:w-1/2 ${
          darkMode ? "dark:bg-[#181636]" : "bg-white"
        } min-h-screen flex flex-col justify-center items-center p-6 md:p-10`}
      >
        <h1 className="text-2xl md:text-3xl font-bold mt-6 dark:text-[#D0CDEF] text-gray-800">
          Welcome To Luxbot
        </h1>
        <p className="dark:text-[#D0CDEF] text-gray-800 font-medium text-lg mt-2 mb-6">
          Start Now !!!
        </p>

        <form
          className="w-full max-w-md space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <input
              id="full_name"
              {...register("full_name", {
                required: "Full name is required",
              })}
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-700 rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={errors.full_name ? "true" : "false"}
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-700 rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-700 rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-sm dark:text-[#D0CDEF] text-gray-800 flex items-center justify-end">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#5784FF] dark:text-blue-400 cursor-pointer hover:underline ms-2 font-semibold"
            >
              Login
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-medium p-3 rounded-md mt-3 h-12 flex justify-center items-center ${
                darkMode
                  ? "dark:bg-[#04021C] hover:dark:bg-gray-900 dark:text-[#E2E0F5]"
                  : "bg-white hover:bg-gray-200 text-gray-900"
              } border border-[#3831A3]`}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md text-white custom-spinner"></span> 
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <p className="dark:text-[#CECBED] text-gray-800 my-3">
          Or Sign up with...
        </p>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            className={`flex items-center justify-center gap-2 border border-[#3831A3] px-4 py-2 rounded-md ${
              darkMode
                ? "dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-[#E2E0F5]"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}
            onClick={() =>
              toast.info("Google Sign-In not implemented", {
                theme: darkMode ? "dark" : "light",
              })
            }
          >
            <FaGoogle className="text-lg" />
            <span className="text-base">Sign in with Google</span>
          </button>

          <button
            className={`flex items-center justify-center gap-2 border border-[#3831A3] px-4 py-2 rounded-md ${
              darkMode
                ? "dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-[#E2E0F5]"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}
            onClick={() =>
              toast.info("Apple Sign-In not implemented", {
                theme: darkMode ? "dark" : "light",
              })
            }
          >
            <GrApple className="text-lg mb-1" />
            <span className="text-base">Sign in with Apple</span>
          </button>
        </div>
      </div>

      <div
        className={`hidden md:flex w-1/2 flex-col justify-center items-center ${
          darkMode ? "dark:bg-[#14122B]" : "bg-white"
        } min-h-screen p-10 text-center`}
      >
        <h2 className="text-lg md:text-xl font-semibold dark:text-[#D0CDEF] text-gray-800 w-1/3 mb-10">
          Understanding the Legal System, Your Rights and Responsibilities
        </h2>
        <img
          src="https://i.ibb.co.com/xSCND5zj/Group-1597883253.png"
          alt="AI Bot Illustration"
          className="w-1/2 mb-6"
        />
        <p className="dark:text-[#D0CDEF] text-gray-800">
          Protecting Rights, Property, and the Future
        </p>
      </div>
    </div>
  );
};

export default Register;


