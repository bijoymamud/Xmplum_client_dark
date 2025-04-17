import React from 'react'
import { useLocation } from 'react-router-dom'

const ChatHistory = () => {
    const chat = useLocation().state;
    console.log(chat)
  return (
    <div>
      {/* <h2 className='dark:text-[#D0CDEF]'>Chat history</h2> */}
      <h1 className='dark:text-[#D0CDEF]'>{chat?.title}</h1>
    </div>
  )
}

export default ChatHistory
