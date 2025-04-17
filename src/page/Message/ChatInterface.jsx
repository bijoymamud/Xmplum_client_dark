import React, { useState, useRef, useEffect } from "react";

import { useParams } from "react-router-dom";
import { Send, Paperclip } from "lucide-react"; // Icons for send and attachment
import { useDispatch, useSelector } from "react-redux";
import { useSendMessageMutation } from "../../redux/features/baseApi";
import { addChatMessage, setChatId } from "../../redux/state/sliceChatPage";

const ChatInterface = () => {
  const dispatch = useDispatch()
  const chatId = useSelector((state) =>state.chatpage.chatId)
  const botId = useSelector((state) =>state.chatpage.botId)
  const messages = useSelector((state) =>state.chatpage.chatList)
  console.log(chatId, botId)
  // const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState(""); 
  const chatEndRef = useRef(null); 
  const chatContainerRef = useRef(null); 
  const [sendMessage, {isLoading}] = useSendMessageMutation();




  // Scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage =async () => {
    if (input.trim() === "") return; 

    const formData = new FormData();
    formData.append("question", input.trim());
    formData.append("chat_id", chatId);
    formData.append("bot_id", botId);


    try {
      const response = await sendMessage(formData).unwrap();
      console.log(response?.chat_id)
      dispatch(setChatId(response?.chat_id));
      dispatch(addChatMessage(response?.chats[0]));
    } catch (error) {
      console.log(error)
    }
 // Delay to simulate bot thinking
  };

  // Handle pressing Enter to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Handle file attachment (placeholder for now)
  const handleFileAttachment = () => {
   
    console.log("File attachment clicked");
  };

  return (
    <div className="flex flex-col  h-full bg-gray-100 dark:bg-[#1D1B31]">
      {/* Chat Area */}
      <div
        className="flex-1 p-4  flex flex-col-reverse" 
        ref={chatContainerRef}
      >
        <div ref={chatEndRef} /> 
        {messages.length === 0 ? (
          <div className="flex items-center justify-center flex-1">
        
          </div>
        ) : (
          messages
            .slice()
            .reverse() 
            .map((message, index) => (
              <div
                key={index}
                className="flex flex-col mb-4"
              >
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
                    message.sender === "user"
                      ? "dark:bg-[#252244] dark:text-[#D0CDEF]"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message?.question}</p>
                 
                </div>
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
                    message.sender === "user"
                      ? "dark:bg-[#252244] dark:text-[#D0CDEF]"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
                  }`}
                >
            
                  <p>{message.answer}</p>
                </div>
              </div>
            ))
        )}
      </div>
  
      <div className="p-4 bg-white dark:bg-[#2D2956] border-t border-gray-200 dark:border-gray-700 sticky bottom-0 rounded-full">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          {/* File Attachment */}
          <button
            onClick={handleFileAttachment}
            className="p-2 dark:text-[#6A62C3] text-gray-800 transition-colors duration-200"
          >
            <Paperclip size={28} />
          </button>

          {/* Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-full ps-5 bg-gray-100 dark:bg-[#171430] text-gray-800 dark:text-[#D0CDEF] outline-none focus:ring-2 focus:ring-[#D0CDEF] transition-all duration-200"
          />

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="p-2  dark:text-[#6A62C3] text-gray-800 transition-colors duration-200"
          >
            <Send size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

