


// import React, { useState } from "react";

// import { useForm } from "react-hook-form";
// import { useDarkMood } from "../../Context/ThemeContext";
// import { Link, useNavigate } from "react-router-dom";
// import { useChangePasswordMutation } from "../../redux/features/baseApi";

// const ChangePass = () => {
//   const { register, handleSubmit } = useForm();
//   const { darkMode } = useDarkMood();
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(""); // State for error message
//   const navigate = useNavigate(); 
//   const [changePassword] = useChangePasswordMutation()

//   // Handle form submission
//   const onSubmit = (data) => {
//     if (newPassword === confirmPassword) {
//       console.log("Passwords match:", data?.new_password);
//       try {
//         const response = changePassword({new_passwordd: data?.new_password});
//         console.log("newPass", response)
//       } catch (error) {
//         console.log("error", error)
//       }
//       navigate("/login"); 
//     } else {
//       setError("Passwords do not match");
//     }
//   };

//   // Handle real-time validation for Confirm Password
//   const handleConfirmPasswordChange = (e) => {
//     const value = e.target.value;
//     setConfirmPassword(value);
//     if (value && newPassword && value !== newPassword) {
//       setError("Passwords do not match");
//     } else {
//       setError(""); // Clear error if they match or if fields are empty
//     }
//   };

//   return (
//     <div className="flex min-h-screen justify-center items-center">
//       <div className="w-full md:w-1/2 dark:bg-[#181636] min-h-screen flex flex-col justify-center items-center p-6 md:p-10">
//         <h1 className="text-2xl md:text-3xl font-bold mt-6 dark:text-[#D0CDEF] text-gray-800 mb-10">
//           Change Your Password
//         </h1>

//         <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
//           <input
//             {...register("new_password")}
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full p-3 border border-gray-700 rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             {...register("confirm_password")}
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={handleConfirmPasswordChange}
//             className="w-full p-3 border border-gray-700 rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Error Message */}
//           {error && (
//             <p className="text-red-500 text-sm text-left">{error}</p>
//           )}

    

       
//           <button
//             type="submit"
//             className="w-full dark:bg-[#04021C] font-medium hover:bg-gray-200 bg-white border border-[#3831A3] p-3 rounded-md mt-3 dark:text-[#E2E0F5] text-gray-900 hover:dark:bg-gray-900"
//           >
//             Submit
//           </button>
       
//         </form>

       
//       </div>

//       <div className="hidden md:flex w-1/2 flex-col justify-center items-center dark:bg-[#14122B] min-h-screen p-10 text-center">
//         <h2 className="text-lg md:text-xl font-semibold dark:text-[#D0CDEF] text-gray-800 w-1/3 mb-10">
//           Understanding the Legal System, Your Rights and Responsibilities
//         </h2>

//         <img
//           src="https://i.ibb.co.com/xSCND5zj/Group-1597883253.png"
//           alt="AI Bot Illustration"
//           className="w-1/2 mb-6"
//         />
//         <p className="dark:text-[#D0CDEF] text-gray-800">
//           Protecting Rights, Property, and the Future
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ChangePass;




import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDarkMood } from "../../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../redux/features/baseApi";

const ChangePass = () => {
  const { register, handleSubmit } = useForm();
  const { darkMode } = useDarkMood();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation(); // Added isLoading to handle loading state

  // Handle form submission
  const onSubmit = async (data) => {
    setError(""); // Clear previous errors
    if (newPassword === confirmPassword) {
      try {
        const response = await changePassword({ new_password: data?.new_password }).unwrap();
        console.log("Password changed successfully:", response);
        navigate("/login");
      } catch (error) {
        // Handle backend error (e.g., "Password cannot be empty")
        console.error("Error changing password:", error);
        setError(error?.data?.message || "Failed to change password. Please try again.");
      }
    } else {
      setError("Passwords do not match");
    }
  };

  // Handle real-time validation for Confirm Password
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value && newPassword && value !== newPassword) {
      setError("Passwords do not match");
    } else {
      setError(""); // Clear error if they match or if fields are empty
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full md:w-1/2 dark:bg-[#181636] min-h-screen flex flex-col justify-center items-center p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mt-6 dark:text-[#D0CDEF] text-gray-800 mb-10">
          Change Your Password
        </h1>

        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("new_password", { required: true })}
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            {...register("confirm_password", { required: true })}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full p-3 border border-gray-700 rounded-md dark:text-[#D0CDEF] text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-left">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading} // Disable button during API call
            className={`w-full dark:bg-[#04021C] font-medium hover:bg-gray-200 bg-white border border-[#3831A3] p-3 rounded-md mt-3 dark:text-[#E2E0F5] text-gray-900 hover:dark:bg-gray-900 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <div className="hidden md:flex w-1/2 flex-col justify-center items-center dark:bg-[#14122B] min-h-screen p-10 text-center">
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

export default ChangePass;