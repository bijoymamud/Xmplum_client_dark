import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <section className="bg-gray-100 dark:bg-[#161331] py-3 text-gray-700 dark:text-[#D0CDEF]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-[#D0CDEF]">Luxbot</h1>
          </div>

          <div className="text-center">
            Copyright: © 2025 Redfin. All rights reserved.
          </div>

          <div className="text-center md:text-right">
            <h1 className="uppercase text-xs md:text-sm font-medium mb-2 text-gray-800 dark:text-[#D0CDEF]">
              Follow us on
            </h1>
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-300 dark:bg-[#D0CDEF] flex items-center justify-center">
                <FaInstagram className="text-black text-lg md:text-xl" />
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-300 dark:bg-[#D0CDEF] flex items-center justify-center">
                <FaFacebookF className="text-black text-lg md:text-xl" />
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-300 dark:bg-[#D0CDEF] flex items-center justify-center">
                <FaTwitter className="text-black text-lg md:text-xl" />
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-300 dark:bg-[#D0CDEF] flex items-center justify-center">
                <FaLinkedinIn className="text-black text-lg md:text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;