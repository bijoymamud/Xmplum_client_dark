import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDarkMood } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";

const OtpVerification = () => {
  const { handleSubmit } = useForm();
  const { darkMode } = useDarkMood();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); 
  const inputRefs = useRef([]); 

  // Handle form submission
  const onSubmit = (data) => {
    const otpValue = otp.join(""); 
    console.log("Submitted OTP:", otpValue);
  };


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


  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
     
      inputRefs.current[index - 1].focus();
    }
  };


  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus(); 
    }
    e.preventDefault();
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
                onPaste={index === 0 ? handlePaste : null} // Allow paste only on first input
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref
                className="w-12 h-12 text-center text-lg font-semibold rounded-md border border-gray-700 dark:border-[#3831A3] bg-white dark:bg-[#04021C] text-gray-800 dark:text-[#E2E0F5] outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full dark:bg-[#04021C] font-medium hover:bg-gray-900 border border-[#3831A3] p-3 rounded-md mt-3 dark:text-[#E2E0F5] text-gray-900"
          >
            Continue
          </button>

          <h1 className="dark:text-[#E2E0F5] text-gray-900 cursor-pointer hover:underline text-[16px] text-end" >Resend Code</h1>
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

export default OtpVerification;