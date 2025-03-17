import React from 'react';

const About = () => {
  return (
    <section className="min-h-[70vh] md:pt-20 bg-white dark:bg-[#221F42] p-4 flex items-center justify-center pb-10 md:pb-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="basis-full md:basis-5/12 flex justify-center">
          <img
            src="https://i.ibb.co.com/L38nXPQ/Group-1597883252.png"
            alt="About us illustration"
            className="max-w-full h-auto"
          />
        </div>

        <div className="basis-full md:basis-6/12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-[#D0CDEF]">
            About Us
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-[#D0CDEF]">
            At Luxbot, we are committed to providing reliable and accessible legal support to individuals and businesses. Our team of experienced legal professionals and AI-powered solutions ensure that you receive accurate guidance, tailored advice, and efficient legal assistance whenever you need it. <br /> <br />
            We specialize in legal consultation, contract drafting, dispute resolution, and compliance assistance, helping our users navigate legal complexities with confidence. Whether you are seeking advice or quick legal insights, we are here to support you every step of the way. <br /> <br />
            Your legal concerns, our AI-based solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;