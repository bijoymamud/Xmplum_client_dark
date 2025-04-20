import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Banner = () => {
  const {id} = useParams()
  return (
    <section className='min-h-screen flex items-center justify-center bg-white dark:bg-[#221F42]'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-20'>
          <div className='basis-6/12 text-center md:text-left'>
            <h1 className='text-[50px] font-semibold uppercase dark:text-[#D0CDEF] text-gray-800'>Protecting Your Rights,
            Property & Family</h1>
            <div className='mt-5'>
            <p className='dark:text-[#D0CDEF] text-gray-800 text-2xl'>Expert Legal Solutions in 
           </p>
           <p className='dark:text-[#D0CDEF] text-gray-800 text-2xl'>Real Estate Law & Child Law</p>
            </div>

            <div className='mt-10'>
            
              <Link to="/chat">
              <button className='text-lg dark:text-[#D0CDEF]  font-medium px-[50px] rounded-full py-3 dark:bg-[#271E88] bg-[#271E88] text-[#D0CDEF] cursor-pointer'>
                Start Now
              </button>
              </Link>
         
            </div>
          </div>

          <div className='basis-5/12 flex justify-center items-center'>
            <img 
              src="https://i.ibb.co.com/xSCND5zj/Group-1597883253.png" 
              alt="Banner illustration"
              className='max-w-full h-auto'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner