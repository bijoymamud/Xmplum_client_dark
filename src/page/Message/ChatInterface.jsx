// import React, { useState, useRef, useEffect } from "react";

// import { Send, Paperclip, Loader2, X } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { RPProvider, RPDefaultLayout, RPPages, RPConfig } from '@pdf-viewer/react'

// import {
//   useGetAllMessageMutation,
//   useSendMessageMutation,
// } from "../../redux/features/baseApi";
// import {
//   addChatMessage,
//   addChatMessageMany,
//   setChatId,
//   setSelectedChatId,
//   updateChatMessage,
// } from "../../redux/state/sliceChatPage";
// import { useSearchParams } from "react-router-dom";

// const ChatInterface = () => {
//   const dispatch = useDispatch();
//   const botId = localStorage.getItem("bot_id") || useSelector((state) => state.chatpage.botId);
//   const messages = useSelector((state) => state.chatpage.chatList);
//   const [input, setInput] = useState("");
//   const [isBotTyping, setIsBotTyping] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [pdfError, setPdfError] = useState(null);
//   const chatEndRef = useRef(null);
//   const chatContainerRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [sendMessage] = useSendMessageMutation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [getAllMessage, { isLoading }] = useGetAllMessageMutation();

//   const BASE_URL = "http://192.168.10.131:8000";

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isBotTyping]);

//   const handleFileAttachment = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       setSelectedFile(file);
//     } else {
//       alert("Please select a PDF file");
//       event.target.value = null;
//     }
//   };

//   const removeSelectedFile = () => {
//     setSelectedFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = null;
//     }
//   };

//   const handleSendMessage = async () => {
//     if (input.trim() === "" && !selectedFile) return;

//     const messageData = {
//       sender: "user",
//       question: input.trim() || "File attachment",
//       id: Date.now(),
//     };

//     if (selectedFile) {
//       messageData.question_file = selectedFile.name;
//     }

//     dispatch(addChatMessage(messageData));

//     setIsBotTyping(true);

//     const formData = new FormData();
//     const chatId = searchParams.get("id");
//     formData.append("question", input.trim() || "File attachment");
//     formData.append("chat_id", chatId);
//     formData.append("bot_id", botId);
//     if (selectedFile) {
//       formData.append("question_file", selectedFile);
//     }

//     try {
//       const response = await sendMessage(formData).unwrap();
//       console.log("backend", response);
//       setSearchParams({ id: response?.chat_id });
//       dispatch(setChatId(response?.chat_id));
//       dispatch(setSelectedChatId(response?.chat_id)); 

//       if (response?.chats[0]?.question_file) {
//         const fullPdfUrl = response.chats[0].question_file.startsWith("http")
//           ? response.chats[0].question_file
//           : `${BASE_URL}${response.chats[0].question_file}`;
//         dispatch(
//           updateChatMessage({
//             id: messageData.id,
//             updatedMessage: {
//               ...messageData,
//               question_file: fullPdfUrl,
//             },
//           })
//         );
//       }

//       dispatch(
//         addChatMessage({
//           answer: response?.chats[0]?.answer,
//           sender: "bot",
//         })
//       );
//     } catch (error) {
//       console.error("Send message error:", error);
//     } finally {
//       setIsBotTyping(false);
//       setInput("");
//       setSelectedFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = null;
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSendMessage();
//   };

//   const handlePdfClick = (url) => {
//     setPdfUrl(url);
//     setPdfError(null);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setPdfUrl("");
//     setPdfError(null);
//   };

//   const handleIframeError = () => {
//     setPdfError("Failed to load PDF. The file may not exist or is inaccessible.");
//   };

//   const splitQuestionsAndAnswers = (response) => {
//     const result = [];
//     response.forEach((item) => {
//       // const fullPdfUrl = item.question_file
//       //   ? item.question_file.startsWith("http")
//       //     ? item.question_file
//       //     : `${BASE_URL}${item.question_file}`
//       //   : null;
//       result.push({
//         sender: "user",
//         question: item.question,
//         id: item.id,
//         ...(item.question_file && {
//           question_file: item.question_file,
//         }),
//       });
//       result.push({
//         sender: "bot",
//         answer: item.answer,
//       });
//     });
//     return result;
//   };

//   useEffect(() => {
//     const chatId = searchParams.get("id");
//     if (messages?.length === 0 && chatId) {
//       const initialChatLoad = async () => {
//         const response = await getAllMessage(chatId).unwrap();
//         dispatch(addChatMessageMany(splitQuestionsAndAnswers(response)));
//       };
//       initialChatLoad();
//     }
//   }, [searchParams.get("id")]);

//   return (
//     <div className="flex h-[90vh] gap-5">
//       {/* PDF Modal */}
//       {isModalOpen && (
//         <div className="w-1/2 basis-5/12 h-full bg-white dark:bg-[#2D2956] flex flex-col border-r border-gray-200 dark:border-gray-700">
//           <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
//             <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ps-2">PDF Viewer</h2>
//             <button
//               onClick={closeModal}
//               className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
//             >
//               <X size={24} className="text-gray-800 dark:text-gray-200" />
//             </button>
//           </div>
//           <div className="flex-1 p-4 overflow-auto">
//             {pdfError ? (
//               <div className="flex items-center justify-center h-full text-red-600 dark:text-red-400">
//                 <p>{pdfError}</p>
//               </div>
//             ) : (
//               <RPConfig>
//                 <RPProvider  src={"http://192.168.10.131:8000/media/questions/Confidential_-_1_Thump_AI_Powered_Digital_Marketing_2_pj4yZMz.pdf"}>
//                   <RPDefaultLayout style={{ height: '800px' }}>
//                     <RPPages />
//                   </RPDefaultLayout>
//                 </RPProvider>
//               </RPConfig>
             
//             )}
//           </div>
//         </div>
//       )}

//       {/* Chat Interface */}
//       <div
//         className={`flex flex-col h-[89vh] bg-gray-100 dark:bg-[#1D1B31] transition-all duration-300 ${
//           isModalOpen ? "w-1/2" : "w-full"
//         }`}
//       >
//         {/* Chat Area */}
//         <div className="flex-1 md:p-4 overflow-y-auto h-[70vh]" ref={chatContainerRef}>
//           {messages.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full">
//               <img
//                 className="w-[150px] rounded-lg shadow-lg mb-10"
//                 src="https://i.ibb.co.com/s9CpmcJD/Chatbot-Message-Bubble-removebg-preview.png"
//                 alt="Brand Logo"
//               />
//               <h1 className="text-gray-500 text-4xl font-bold dark:text-gray-200 mb-3">
//                 Your Smart Legal Companion
//               </h1>
//               <p className="text-center dark:text-gray-200 w-3/4">
//                 Get accurate, data-driven answers to your legal questions — powered by real law references,
//                 tailored for clarity and confidence. Start chatting to explore your rights, obligations, and more.
//               </p>
//             </div>
//           ) : (
//             messages.slice().map((message, index) => (
//               <div
//                 key={message.id || index}
//                 className={`flex mb-4 items-end gap-2 ${
//                   message.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 {message.sender === "bot" && (
//                   <img
//                     src="https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-chatbot-color-icon-chat-bot-png-image_5258006.png"
//                     alt="Bot"
//                     className="md:w-10 md:h-10 w-7 h-7 rounded-full object-cover"
//                   />
//                 )}
//                 <div
//                   className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
//                     message.sender === "user"
//                       ? "bg-[#6A62C3] text-white"
//                       : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
//                   }`}
//                 >
//                   <p>{message.sender === "user" ? message.question : message.answer}</p>
//                   {message.question_file && (
//                     <div className="mt-2 flex items-center gap-2">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
//                         alt="PDF"
//                         className="md:w-6 md:h-6 w-3 h-3"
//                       />
//                       <button
//                         onClick={() => handlePdfClick(message.question_file)}
//                         className="text-xs md:text-sm truncate underline hover:text-blue-200"
//                       >
//                         {message.question_file.split("/").pop()}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//                 {message.sender === "user" && (
//                   <img
//                     src="https://freesvg.org/img/publicdomainq-0006224bvmrqd.png"
//                     alt="You"
//                     className="md:w-10 md:h-10 w-7 h-7 rounded-full object-cover"
//                   />
//                 )}
//               </div>
//             ))
//           )}

//           {isBotTyping && (
//             <div className="flex items-end gap-2 mb-4">
//               <img
//                 src="https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-chatbot-color-icon-chat-bot-png-image_5258006.png"
//                 alt="Bot"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <div className="flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 shadow-md text-gray-800 dark:text-gray-200">
//                 <Loader2 className="animate-spin mr-2 w-4 h-4" />
//                 Typing...
//               </div>
//             </div>
//           )}

//           <div ref={chatEndRef} />
//         </div>

//         {selectedFile && (
//           <div className="flex w-1/2 items-center gap-2 mb-2 p-2 rounded-lg">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
//               alt="PDF"
//               className="md:w-6 md:h-6 w-3 h-3"
//             />
//             <span className="text-xs md:text-sm text-gray-800 dark:text-[#D0CDEF] truncate">
//               {selectedFile.name}
//             </span>
//             <button
//               onClick={removeSelectedFile}
//               className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
//             >
//               <X size={16} className="dark:text-red-500" />
//             </button>
//           </div>
//         )}

//         {/* Input Area */}
//         <div className="md:p-4 p-2 bg-white rounded-full dark:bg-[#2D2956] border-t border-gray-200 dark:border-gray-700 sticky bottom-0">
//           <div className="flex items-center gap-2 mx-auto">
//             <button
//               onClick={handleFileAttachment}
//               className="p-2 cursor-pointer dark:hover:bg-gray-700 rounded-full dark:text-[#6A62C3] text-gray-800 transition-colors duration-200"
//             >
//               <Paperclip  size={window.innerWidth < 640 ? 24: 28} />
//             </button>
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               accept="application/pdf"
//               className="hidden"
//             />

//             <div className="flex-1 flex flex-col">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message..."
//                 className="flex-1 p-3 rounded-full ps-5 bg-gray-100 dark:bg-[#171430] text-gray-800 dark:text-[#D0CDEF] outline-none focus:ring-1 focus:ring-[#605d7a] transition-all duration-200"
//               />
//             </div>

//             <button
//               onClick={handleSendMessage}
//               className="p-2 cursor-pointer dark:hover:bg-gray-700 rounded-full dark:text-[#6A62C3] text-gray-800 transition-colors duration-200"
//             >
//               {/* <Send size={28} /> */}
//               <Send size={window.innerWidth < 640 ? 24: 28} />

//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;






import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RPProvider, RPDefaultLayout, RPPages, RPConfig } from '@pdf-viewer/react';

import {
  useGetAllMessageMutation,
  useLoggeInUserQuery,
  useSendMessageMutation,
} from "../../redux/features/baseApi";
import {
  addChatMessage,
  addChatMessageMany,
  setChatId,
  setSelectedChatId,
  updateChatMessage,
} from "../../redux/state/sliceChatPage";
import { useSearchParams } from "react-router-dom";

const ChatInterface = () => {
  const dispatch = useDispatch();
  const botId = localStorage.getItem("bot_id") || useSelector((state) => state.chatpage.botId);
  const messages = useSelector((state) => state.chatpage.chatList);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfError, setPdfError] = useState(null);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [sendMessage] = useSendMessageMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [getAllMessage, { isLoading }] = useGetAllMessageMutation();
  const { data: userInfo } = useLoggeInUserQuery();

  const BASE_URL = "http://192.168.10.131:8000";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  const handleFileAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a PDF file");
      event.target.value = null;
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "" && !selectedFile) return;

    const messageData = {
      sender: "user",
      question: input.trim() || "File attachment",
      id: Date.now(),
    };

    if (selectedFile) {
      messageData.question_file = selectedFile.name;
    }

    dispatch(addChatMessage(messageData));

    setIsBotTyping(true);

    const formData = new FormData();
    const chatId = searchParams.get("id");
    formData.append("question", input.trim() || "File attachment");
    formData.append("chat_id", chatId);
    formData.append("bot_id", botId);
    if (selectedFile) {
      formData.append("question_file", selectedFile);
    }

    try {
      const response = await sendMessage(formData).unwrap();
      console.log("backend", response);
      setSearchParams({ id: response?.chat_id });
      dispatch(setChatId(response?.chat_id));
      dispatch(setSelectedChatId(response?.chat_id));

      if (response?.chats[0]?.question_file) {
        const fullPdfUrl = response.chats[0].question_file.startsWith("http")
          ? response.chats[0].question_file
          : `${BASE_URL}${response.chats[0].question_file}`;
        dispatch(
          updateChatMessage({
            id: messageData.id,
            updatedMessage: {
              ...messageData,
              question_file: fullPdfUrl,
            },
          })
        );
      }

      dispatch(
        addChatMessage({
          answer: response?.chats[0]?.answer,
          sender: "bot",
        })
      );
    } catch (error) {
      console.error("Send message error:", error);
    } finally {
      setIsBotTyping(false);
      setInput("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handlePdfClick = (url) => {
    setPdfUrl(url);
    setPdfError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPdfUrl("");
    setPdfError(null);
  };

  const handleIframeError = () => {
    setPdfError("Failed to load PDF. The file may not exist or is inaccessible.");
  };

  const splitQuestionsAndAnswers = (response) => {
    const result = [];
    response.forEach((item) => {
      result.push({
        sender: "user",
        question: item.question,
        id: item.id,
        ...(item.question_file && {
          question_file: item.question_file,
        }),
      });
      result.push({
        sender: "bot",
        answer: item.answer,
      });
    });
    return result;
  };

  useEffect(() => {
    const chatId = searchParams.get("id");
    if (messages?.length === 0 && chatId) {
      const initialChatLoad = async () => {
        const response = await getAllMessage(chatId).unwrap();
        dispatch(addChatMessageMany(splitQuestionsAndAnswers(response)));
      };
      initialChatLoad();
    }
  }, [searchParams.get("id")]);

  return (
    <div className="flex h-[90vh] gap-5">
      {/* PDF Modal */}
      {isModalOpen && (
        <div className="w-1/2 basis-5/12 h-full bg-white dark:bg-[#2D2956] flex flex-col border-r border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ps-2">PDF Viewer</h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
            >
              <X size={24} className="text-gray-800 dark:text-gray-200" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {pdfError ? (
              <div className="flex items-center justify-center h-full text-red-600 dark:text-red-400">
                <p>{pdfError}</p>
              </div>
            ) : (
              <RPConfig>
                <RPProvider src={pdfUrl}>
                  <RPDefaultLayout style={{ height: '800px' }}>
                    <RPPages />
                  </RPDefaultLayout>
                </RPProvider>
              </RPConfig>
            )}
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div
        className={`flex flex-col h-[89vh] bg-gray-100 dark:bg-[#1D1B31] transition-all duration-300 ${
          isModalOpen ? "w-1/2" : "w-full"
        }`}
      >
        {/* Chat Area */}
        <div className="flex-1 md:p-4 overflow-y-auto h-[70vh]" ref={chatContainerRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img
                className="w-[150px] rounded-lg shadow-lg mb-10"
                src="https://i.ibb.co.com/s9CpmcJD/Chatbot-Message-Bubble-removebg-preview.png"
                alt="Brand Logo"
              />
              <h1 className="text-gray-500 text-4xl font-bold dark:text-gray-200 mb-3">
                Your Smart Legal Companion
              </h1>
              <p className="text-center dark:text-gray-200 w-3/4">
                Get accurate, data-driven answers to your legal questions — powered by real law references,
                tailored for clarity and confidence. Start chatting to explore your rights, obligations, and more.
              </p>
            </div>
          ) : (
            messages.slice().map((message, index) => (
              <div
                key={message.id || index}
                className={`flex mb-4 items-end gap-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <img
                    src="https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-chatbot-color-icon-chat-bot-png-image_5258006.png"
                    alt="Bot"
                    className="md:w-10 md:h-10 w-7 h-7 rounded-full object-cover"
                  />
                )}
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
                    message.sender === "user"
                      ? "bg-[#6A62C3] text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message.sender === "user" ? message.question : message.answer}</p>
                  {message.question_file && (
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                        alt="PDF"
                        className="md:w-6 md:h-6 w-3 h-3"
                      />
                      <button
                        onClick={() => handlePdfClick(message.question_file)}
                        className="text-xs md:text-sm truncate underline hover:text-blue-200"
                      >
                        {message.question_file.split("/").pop()}
                      </button>
                    </div>
                  )}
                </div>
                {message.sender === "user" && (
                  <img
                  src={`${BASE_URL}${userInfo?.user?.image}`}                    alt="You"
                    className="md:w-10 md:h-10 w-7 h-7 rounded-full object-cover"
                  />
                )}
              </div>
            ))
          )}

          {isBotTyping && (
            <div className="flex items-end gap-2 mb-4">
              <img
                src="https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-chatbot-color-icon-chat-bot-png-image_5258006.png"
                alt="Bot"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex items-center justify-center px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 shadow-md text-gray-800 dark:text-gray-200">
                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                Typing...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {selectedFile && (
          <div className="flex w-1/2 items-center gap-2 mb-2 p-2 rounded-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
              alt="PDF"
              className="md:w-6 md:h-6 w-3 h-3"
            />
            <span className="text-xs md:text-sm text-gray-800 dark:text-[#D0CDEF] truncate">
              {selectedFile.name}
            </span>
            <button
              onClick={removeSelectedFile}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
            >
              <X size={16} className="dark:text-red-500" />
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="md:p-4 p-2 bg-white rounded-full dark:bg-[#2D2956] border-t border-gray-200 dark:border-gray-700 sticky bottom-0">
          <div className="flex items-center gap-2 mx-auto">
            <button
              onClick={handleFileAttachment}
              className="p-2 cursor-pointer dark:hover:bg-gray-700 rounded-full dark:text-[#6A62C3] text-gray-800 transition-colors duration-200"
            >
              <Paperclip size={window.innerWidth < 640 ? 24 : 28} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />

            <div className="flex-1 flex flex-col">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-full ps-5 bg-gray-100 dark:bg-[#171430] text-gray-800 dark:text-[#D0CDEF] outline-none focus:ring-1 focus:ring-[#605d7a] transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSendMessage}
              className="p-2 cursor-pointer dark:hover:bg-gray-700 rounded-full dark:text-[#6A62C3] text-gray-800 transition-colors duration-200"
            >
              <Send size={window.innerWidth < 640 ? 24 : 28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;