// import React, { useState, useRef } from "react";

// import { useForm } from "react-hook-form";
// import { useDarkMood } from "../../Context/ThemeContext";
// import { Link } from "react-router-dom";

// const OtpVerification = () => {
//   const { handleSubmit } = useForm();
//   const { darkMode } = useDarkMood();
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]); 
//   const inputRefs = useRef([]); 

//   // Handle form submission
//   const onSubmit = (data) => {
//     const otpValue = otp.join(""); 
//     console.log("Submitted OTP:", otpValue);
//   };


//   const handleChange = (index, value) => {
//     if (/^[0-9]$/.test(value) || value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

      
//       if (value !== "" && index < 5) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };


//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
     
//       inputRefs.current[index - 1].focus();
//     }
//   };


//   const handlePaste = (e) => {
//     const pastedData = e.clipboardData.getData("text").trim();
//     if (/^\d{6}$/.test(pastedData)) {
//       const newOtp = pastedData.split("");
//       setOtp(newOtp);
//       inputRefs.current[5].focus(); 
//     }
//     e.preventDefault();
//   };

//   return (
//     <div className="flex min-h-screen justify-center items-center">
//       <div className="w-full md:w-1/2 dark:bg-[#181636] min-h-screen flex flex-col justify-center items-center p-6 md:p-10">
//         <h1 className="text-2xl md:text-3xl font-bold mt-6 dark:text-[#D0CDEF] text-gray-800 mb-10">
//           We have sent you an activation code!
//         </h1>

//         <p className="dark:text-[#D0CDEF] text-gray-800 text-center max-w-md mb-6">
//           An email has been sent to your mail address containing a code to reset your password.
//         </p>

//         <h2 className="dark:text-[#D0CDEF] text-xl mb-5 text-gray-800 font-semibold">
//           Enter verification code:
//         </h2>

//         <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           {/* OTP Input Fields */}
//           <div className="flex justify-center space-x-7">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 onPaste={index === 0 ? handlePaste : null} // Allow paste only on first input
//                 ref={(el) => (inputRefs.current[index] = el)} // Assign ref
//                 className="w-12 h-12 text-center text-lg font-semibold rounded-md border border-gray-700 dark:border-[#3831A3] bg-white dark:bg-[#04021C] text-gray-800 dark:text-[#E2E0F5] outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//               />
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="w-full dark:bg-[#04021C] font-medium hover:bg-gray-200 border border-[#3831A3] p-3 rounded-md mt-3 dark:text-[#E2E0F5] text-gray-900"
//           >
//             Continue
//           </button>

//           <h1 className="dark:text-[#E2E0F5] text-gray-900 cursor-pointer hover:underline text-[16px] text-end" >Resend Code</h1>
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

// export default OtpVerification;





// import React, { useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useDarkMood } from "../../Context/ThemeContext";
// import { Link, useNavigate } from "react-router-dom";
// import { useResendOTPMutation, useResetOTPMutation } from "../../redux/features/baseApi";

// const OtpVerification = () => {
//   const { handleSubmit } = useForm();
//   const { darkMode } = useDarkMood();
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [resetOTP, { isLoading }] = useResetOTPMutation();
//   const [resendOTP] = useResendOTPMutation();
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   const onSubmit = async () => {
//     const otpValue = otp.join("");
//     console.log("Submitted OTP:", otpValue);

//     const email = localStorage.getItem("email");
//     if (!email) {
//       return;
//     }

//     try {
//       await resetOTP({email: email, otp: otpValue}).unwrap();
//       navigate("/confirm_password");
//     } catch (error) {
//       console.error("Error submitting OTP:", error);
//     }
//   };

//   const handleChange = (index, value) => {
//     if (/^[0-9]$/.test(value) || value === "") {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value !== "" && index < 5) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const pastedData = e.clipboardData.getData("text").trim();
//     if (/^\d{6}$/.test(pastedData)) {
//       const newOtp = pastedData.split("");
//       setOtp(newOtp);
//       inputRefs.current[5].focus();
//     }
//     e.preventDefault();
//   };

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <div className="flex min-h-screen justify-center items-center">
//       <div className="w-full md:w-1/2 dark:bg-[#181636] min-h-screen flex flex-col justify-center items-center p-6 md:p-10">
//         <h1 className="text-2xl md:text-3xl font-bold mt-6 dark:text-[#D0CDEF] text-gray-800 mb-10">
//           We have sent you an activation code!
//         </h1>

//         <p className="dark:text-[#D0CDEF] text-gray-800 text-center max-w-md mb-6">
//           An email has been sent to your mail address containing a code to reset your password.
//         </p>

//         <h2 className="dark:text-[#D0CDEF] text-xl mb-5 text-gray-800 font-semibold">
//           Enter verification code:
//         </h2>

//         <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           {/* OTP Input Fields */}
//           <div className="flex justify-center space-x-7">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 onPaste={index === 0 ? handlePaste : null}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 className="w-12 h-12 text-center text-lg font-semibold rounded-md border border-gray-700 dark:border-[#3831A3] bg-white dark:bg-[#04021C] text-gray-800 dark:text-[#E2E0F5] outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                 disabled={isLoading}
//               />
//             ))}
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full dark:bg-[#04021C] font-medium hover:bg-gray-200 hover:dark:bg-gray-800 border border-[#3831A3] p-3 rounded-md mt-3 dark:text-[#E2E0F5] text-gray-900 flex items-center justify-center gap-2"
//           >
//             {isLoading ? (
//               <>
//                 <span className="loading loading-spinner loading-lg"></span>
//                 Verifying...
//               </>
//             ) : (
//               "Continue"
//             )}
//           </button>

//           <h1
//             onClick={toggleModal}
//             className="dark:text-[#E2E0F5] text-gray-900 cursor-pointer hover:underline text-[16px] text-end mt-3"
//           >
//             Resend Code
//           </h1>
//         </form>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div
//             className="absolute inset-0 bg-black opacity-50"
//             onClick={toggleModal}
//           ></div>

//           <div className="relative bg-white dark:bg-[#181636] rounded-lg p-6 w-full max-w-sm shadow-lg">
//             <h3 className="text-lg font-semibold dark:text-[#D0CDEF] text-gray-800 mb-4">
//               Resend Activation Code
//             </h3>
//             <p className="dark:text-[#E2E0F5] text-gray-900 mb-6">
//               A new activation code has been sent to your email. Please check your inbox (and spam folder) to retrieve it.
//             </p>
//             <button
//               onClick={toggleModal}
//               className="w-full bg-[#3831A3] hover:bg-[#271E88] text-white font-medium p-2 rounded-md transition-all duration-200 dark:bg-[#312f50] hover:dark:bg-[#393663]"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

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

// export default OtpVerification;


import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDarkMood } from "../../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useResendOTPMutation, useResetOTPMutation } from "../../redux/features/baseApi";

const OtpVerification = () => {
  const { handleSubmit } = useForm();
  const { darkMode } = useDarkMood();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // State for dynamic modal message
  const [resetOTP, { isLoading: isResetLoading }] = useResetOTPMutation();
  const [resendOTP, { isLoading: isResendLoading }] = useResendOTPMutation(); // Added isResendLoading
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Handle OTP submission
  const onSubmit = async () => {
    const otpValue = otp.join("");
    console.log("Submitted OTP:", otpValue);

    const email = localStorage.getItem("email");
    if (!email) {
      setModalMessage("No email found. Please try again.");
      setIsModalOpen(true);
      return;
    }

    try {
      await resetOTP({ email, otp: otpValue }).unwrap();
      navigate("/confirm_password");
    } catch (error) {
      console.error("Error submitting OTP:", error);
      setModalMessage(error?.data?.message || "Invalid OTP. Please try again.");
      setIsModalOpen(true);
    }
  };

  // Handle Resend OTP
  const handleResendOTP = async () => {
    const email = localStorage.getItem("email");
    console.log("userMail",email)
    if (!email) {
      setModalMessage("No email found. Please try again.");
      setIsModalOpen(true);
      return;
    }

    try {
      await resendOTP({email:email}).unwrap();
      setModalMessage("A new activation code has been sent to your email. Please check your inbox (and spam folder).");
      setIsModalOpen(true);
      setOtp(["", "", "", "", "", ""]); // Reset OTP input fields
      inputRefs.current[0].focus(); // Focus on first input
    } catch (error) {
      console.error("Error resending OTP:", error);
      setModalMessage(error?.data?.message || "Failed to resend OTP. Please try again.");
      setIsModalOpen(true);
    }
  };

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setModalMessage(""); // Clear message when closing
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-full md:w-1/2 dark:bg-[#181636] min-h-screen flex flex-col justify-center items-center p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mt-6 dark:text-[#D0CDEF] text-gray-800 mb-10">
          We have sent you an activation code!
        </h1>

        <p className="dark:text-[#D0CDEF] text-gray-800 text-center max-w-md mb-6">
          An email has been sent to your mail address containing a code to reset your password.
        </p>

        <h2 className="dark:text-[#D0CDEF] text-xl mb-5 text-gray-800 font-semibold">
          Enter verification code:
        </h2>

        <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-7">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : null}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-lg font-semibold rounded-md border border-gray-700 dark:border-[#3831A3] bg-white dark:bg-[#04021C] text-gray-800 dark:text-[#E2E0F5] outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                disabled={isResetLoading || isResendLoading}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isResetLoading || isResendLoading}
            className={`w-full dark:bg-[#04021C] font-medium hover:bg-gray-200 hover:dark:bg-gray-800 border border-[#3831A3] p-3 rounded-md mt-3 dark:text-[#E2E0F5] text-gray-900 flex items-center justify-center gap-2 ${
              isResetLoading || isResendLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isResetLoading ? (
              <>
                <span className="loading loading-spinner loading-lg"></span>
                Verifying...
              </>
            ) : (
              "Continue"
            )}
          </button>

          <h1
            onClick={handleResendOTP}
            className={`dark:text-[#E2E0F5] text-gray-900 text-[16px] text-end mt-3 ${
              isResendLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:underline"
            }`}
          >
            {isResendLoading ? "Resending..." : "Resend Code"}
          </h1>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={toggleModal}
          ></div>

          <div className="relative bg-white dark:bg-[#181636] rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold dark:text-[#D0CDEF] text-gray-800 mb-4">
              {modalMessage.includes("sent") ? "Activation Code Sent" : "Resend Activation Code"}
            </h3>
            <p className="dark:text-[#E2E0F5] text-gray-900 mb-6">
              {modalMessage || "A new activation code has been sent to your email. Please check your inbox (and spam folder) to retrieve it."}
            </p>
            <button
              onClick={toggleModal}
              className="w-full bg-[#3831A3] hover:bg-[#271E88] text-white font-medium p-2 rounded-md transition-all duration-200 dark:bg-[#312f50] hover:dark:bg-[#393663]"
              disabled={isResendLoading}
            >
              Close
            </button>
          </div>
        </div>
      )}

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

export default OtpVerification;