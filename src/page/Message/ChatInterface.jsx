import React, { useState, useRef, useEffect } from "react";

import { useParams } from "react-router-dom";
import { Send, Paperclip } from "lucide-react"; // Icons for send and attachment

const ChatInterface = () => {
  const { id } = useParams(); // Get the chat ID from URL params
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(""); // Store the current input
  const chatEndRef = useRef(null); // Reference to scroll to the bottom
  const chatContainerRef = useRef(null); // Reference to the chat container

  // Sample bot responses (replace with API calls later)
  const botResponses = [
    "Hello! How can I assist you today?",
    "That's an interesting question! Let me help you with that.",
    "Could you provide more details, please?",
    "I'm here to help with any legal queries you might have!",
  ];

  // Scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() === "") return; // Prevent sending empty messages

    // Add user message to chat
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput(""); // Clear input

    // Simulate bot response (replace with API call)
    setTimeout(() => {
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [
        ...prev,
        { text: randomResponse, sender: "bot" },
      ]);
    }, 1000); // Delay to simulate bot thinking
  };

  // Handle pressing Enter to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Handle file attachment (placeholder for now)
  const handleFileAttachment = () => {
    // Implement file upload logic here (e.g., open file picker)
    console.log("File attachment clicked");
  };

  return (
    <div className="flex flex-col  h-full bg-gray-100 dark:bg-[#1D1B31]">
      {/* Chat Area */}
      <div
        className="flex-1 p-4 overflow-y-auto flex flex-col-reverse" // flex-col-reverse to stack messages from bottom to top
        ref={chatContainerRef}
      >
        <div ref={chatEndRef} /> {/* Dummy div to scroll to */}
        {messages.length === 0 ? (
          <div className="flex items-center justify-center flex-1">
        
          </div>
        ) : (
          messages
            .slice()
            .reverse() // Reverse the messages array to display newest at the bottom
            .map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))
        )}
      </div>
      {/* Input Area (Fixed at Bottom) */}
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




