import React, { useState } from "react";
import { ShieldCheck, Users } from "lucide-react";
import { TbUserDollar } from "react-icons/tb";
import { useDarkMood } from "../../Context/ThemeContext";
import { useDropzone } from "react-dropzone";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDashboardInfoQuery } from "../../redux/features/baseApi";

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;

const AdminHome = () => {
  const { darkMode } = useDarkMood();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [pdfPreviews, setPdfPreviews] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadStatus, setUploadStatus] = useState({}); // Tracks status (Pending, Uploading, Success, Error)
  const [uploadCount, setUploadCount] = useState({ current: 0, total: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadErrors, setUploadErrors] = useState([]);
  const { data: cardData } = useDashboardInfoQuery();

  const onDrop = async (acceptedFiles) => {
    const pdfs = acceptedFiles.filter((file) => file.type === "application/pdf");
    if (pdfs.length === 0) {
      alert("Only PDF files are allowed.");
      return;
    }

    setFilesToUpload(pdfs);
    setUploadedFiles(pdfs.map((file) => ({ name: file.name })));
    setUploadCount({ current: 0, total: pdfs.length });
    setUploadProgress(
      pdfs.reduce((acc, file) => ({ ...acc, [file.name]: 0 }), {})
    );
    setUploadStatus(
      pdfs.reduce((acc, file) => ({ ...acc, [file.name]: "Pending" }), {})
    );
    generatePreviews(pdfs);
  };

  const generatePreviews = async (files) => {
    const previews = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const scale = 1.2;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      previews.push({ name: file.name, url: canvas.toDataURL("image/png") });
    }
    setPdfPreviews(previews);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const handleUpload = async () => {
    if (filesToUpload.length === 0) {
      alert("No PDFs selected to upload.");
      return;
    }

    setIsModalOpen(true);
    setUploadErrors([]);
    const accessToken = localStorage.getItem("access_token");

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      setUploadStatus((prev) => ({ ...prev, [file.name]: "Uploading" }));
      const formData = new FormData();
      formData.append("pdfs", file);

      try {
        const response = await fetch(
          "http://192.168.10.131:8000/api/v1/chat_bot/upload-pdfs/",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            // Note: onUploadProgress is not natively supported by fetch; using a workaround
          }
        );

        // Simulate progress for demo purposes (since fetch doesn't support onUploadProgress reliably)
        for (let p = 0; p <= 100; p += 20) {
          setUploadProgress((prev) => ({ ...prev, [file.name]: p }));
          await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
        }

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        await response.json();
        setUploadStatus((prev) => ({ ...prev, [file.name]: "Success" }));
        setUploadCount((prev) => ({
          ...prev,
          current: prev.current + 1,
        }));
      } catch (error) {
        setUploadStatus((prev) => ({ ...prev, [file.name]: "Error" }));
        setUploadErrors((prev) => [
          ...prev,
          `Error uploading ${file.name}: ${error.message}`,
        ]);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFilesToUpload([]);
    setUploadedFiles([]);
    setPdfPreviews([]);
    setUploadProgress({});
    setUploadStatus({});
    setUploadCount({ current: 0, total: 0 });
    setUploadErrors([]);
  };

  return (
    <section>
      {/* Metrics Cards */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-6">
        <div className="dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF]">
              Total Users
            </h1>
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <Users size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-[#D0CDEF]">
            {cardData?.total_users}
          </h1>
        </div>

        <div className="dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF]">
              Subscribe Amount
            </h1>
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <TbUserDollar className="text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-[#D0CDEF]">
            $ {cardData?.total_amount}
          </h1>
        </div>

        <div className="dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF]">
              Active Users
            </h1>
            <div className="p-3 bg-amber-100 rounded-full text-amber-600">
              <ShieldCheck size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-[#D0CDEF]">
            {cardData?.active_user}
          </h1>
        </div>
      </div>

      {/* PDF Upload Section */}
      <div className="mt-32 w-3/4 dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF] mb-4">
          Upload PDFs
        </h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg py-20 p-6 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
              : "border-gray-300 dark:border-[#656092] dark:bg-[#24214A]"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600 dark:text-[#D0CDEF] mb-2">
            {isDragActive
              ? "Drop your PDF files here..."
              : "Drag & drop PDF files here, or click to upload"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            (Only *.pdf files are accepted)
          </p>
        </div>

        {/* Uploaded Files with Progress */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-[#D0CDEF] mb-2">
              Selected Files
            </h3>
            <ul className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700 dark:text-[#D0CDEF]"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/11180/11180756.png"
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                  <span className="truncate">{file.name}</span>
                  <span className="ml-auto text-sm">
                    {uploadStatus[file.name] === "Success"
                      ? "Success"
                      : uploadStatus[file.name] === "Error"
                      ? "Error"
                      : uploadProgress[file.name] > 0
                      ? `${uploadProgress[file.name]}%`
                      : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Preview Thumbnails */}
        {pdfPreviews.length > 0 && (
          <div className="mt-6 space-y-6">
            {pdfPreviews.map((pdf, index) => (
              <div
                key={index}
                className="border rounded-md shadow-sm p-2 bg-white dark:bg-[#2A2756]"
              >
                <img
                  src={pdf.url}
                  alt={pdf.name}
                  className="w-full max-w-xl mx-auto rounded"
                />
                <p className="mt-2 text-sm text-center text-gray-700 dark:text-[#D0CDEF]">
                  {pdf.name}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleUpload}
            className={`flex items-center gap-2 dark:text-[#D0CDEF] font-semibold py-2 px-8 border border-white/30 shadow-sm shadow-amber-200 ${
              filesToUpload.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:dark:bg-[#222036]"
            }`}
            disabled={filesToUpload.length === 0}
          >
            Upload PDF <IoCloudUploadOutline size={25} />
          </button>
        </div>
      </div>

      {/* Upload Status Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex backdrop-blur-[3px] items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1B1744] border dark:border-white/20 rounded-lg p-6 w-full max-w-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF] mb-4">
              Upload Status
            </h2>

            <div className="mb-4">
              <p className="text-gray-700 dark:text-[#D0CDEF]">
                Progress: {uploadCount.current} / {uploadCount.total} PDFs
              </p>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/11180/11180756.png"
                    alt=""
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-[#D0CDEF] truncate">
                      {file.name}
                    </p>
                    {uploadStatus[file.name] !== "Success" &&
                      uploadStatus[file.name] !== "Error" && (
                        <div className="w-full bg-gray-200 dark:bg-[#656092] rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${uploadProgress[file.name] || 0}%`,
                            }}
                          ></div>
                        </div>
                      )}
                  </div>
                  <span
                    className={`text-sm ${
                      uploadStatus[file.name] === "Success"
                        ? "text-green-600 dark:text-green-400"
                        : uploadStatus[file.name] === "Error"
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-700 dark:text-[#D0CDEF]"
                    }`}
                  >
                    {uploadStatus[file.name] === "Success"
                      ? "Success"
                      : uploadStatus[file.name] === "Error"
                      ? "Error"
                      : uploadStatus[file.name] === "Uploading"
                      ? `${uploadProgress[file.name]}%`
                      : "Pending"}
                  </span>
                </div>
              ))}
            </div>

            {/* Error Messages */}
            {uploadErrors.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-red-600 dark:text-red-400">
                  Errors:
                </h3>
                <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400">
                  {uploadErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Summary and Close Button */}
            {uploadCount.current === uploadCount.total && (
              <div className="mt-4">
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Upload Completed!
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 cursor-pointer py-2 dark:bg-[#58538b] text-white rounded hover:bg-blue-600 dark:hover:bg-[#413d72]"
                disabled={uploadCount.current < uploadCount.total}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminHome;


// import React, { useState } from "react";
// import { ShieldCheck, Users } from "lucide-react";
// import { TbUserDollar } from "react-icons/tb";
// import { useDarkMood } from "../../Context/ThemeContext";
// import { useDropzone } from "react-dropzone";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { useDashboardInfoQuery } from "../../redux/features/baseApi";

// GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;

// const AdminHome = () => {
//   const { darkMode } = useDarkMood();
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [pdfPreviews, setPdfPreviews] = useState([]);
//   const [filesToUpload, setFilesToUpload] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [uploadStatus, setUploadStatus] = useState({}); // Tracks status (Pending, Uploading, Success, Error)
//   const [uploadCount, setUploadCount] = useState({ current: 0, total: 0 });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [uploadErrors, setUploadErrors] = useState([]);
//   const { data: cardData } = useDashboardInfoQuery();

//   const onDrop = async (acceptedFiles) => {
//     const pdfs = acceptedFiles.filter((file) => file.type === "application/pdf");
//     if (pdfs.length === 0) {
//       alert("Only PDF files are allowed.");
//       return;
//     }

//     setFilesToUpload(pdfs);
//     setUploadedFiles(pdfs.map((file) => ({ name: file.name })));
//     setUploadCount({ current: 0, total: pdfs.length });
//     setUploadProgress(
//       pdfs.reduce((acc, file) => ({ ...acc, [file.name]: 0 }), {})
//     );
//     setUploadStatus(
//       pdfs.reduce((acc, file) => ({ ...acc, [file.name]: "Pending" }), {})
//     );
//     generatePreviews(pdfs);
//   };

//   const generatePreviews = async (files) => {
//     const previews = [];
//     for (const file of files) {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await getDocument({ data: arrayBuffer }).promise;
//       const page = await pdf.getPage(1);
//       const scale = 1.2;
//       const viewport = page.getViewport({ scale });

//       const canvas = document.createElement("canvas");
//       const context = canvas.getContext("2d");
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;

//       await page.render({ canvasContext: context, viewport }).promise;
//       previews.push({ name: file.name, url: canvas.toDataURL("image/png") });
//     }
//     setPdfPreviews(previews);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [".pdf"] },
//     multiple: true,
//   });

//   const handleUpload = async () => {
//     if (filesToUpload.length === 0) {
//       alert("No PDFs selected to upload.");
//       return;
//     }

//     setIsModalOpen(true);
//     setUploadErrors([]);
//     const accessToken = localStorage.getItem("access_token");

//     for (let i = 0; i < filesToUpload.length; i++) {
//       const file = filesToUpload[i];
//       setUploadStatus((prev) => ({ ...prev, [file.name]: "Uploading" }));
//       const formData = new FormData();
//       formData.append("pdfs", file);

//       try {
//         const response = await fetch(
//           "http://192.168.10.131:8000/api/v1/chat_bot/upload-pdfs/",
//           {
//             method: "POST",
//             body: formData,
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//             // Note: onUploadProgress is not natively supported by fetch; using a workaround
//           }
//         );

//         // Simulate progress for demo purposes (since fetch doesn't support onUploadProgress reliably)
//         for (let p = 0; p <= 100; p += 20) {
//           setUploadProgress((prev) => ({ ...prev, [file.name]: p }));
//           await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
//         }

//         if (!response.ok) {
//           throw new Error(`Failed to upload ${file.name}`);
//         }

//         await response.json();
//         setUploadStatus((prev) => ({ ...prev, [file.name]: "Success" }));
//         setUploadCount((prev) => ({
//           ...prev,
//           current: prev.current + 1,
//         }));
//       } catch (error) {
//         setUploadStatus((prev) => ({ ...prev, [file.name]: "Error" }));
//         setUploadErrors((prev) => [
//           ...prev,
//           `Error uploading ${file.name}: ${error.message}`,
//         ]);
//       }
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setFilesToUpload([]);
//     setUploadedFiles([]);
//     setPdfPreviews([]);
//     setUploadProgress({});
//     setUploadStatus({});
//     setUploadCount({ current: 0, total: 0 });
//     setUploadErrors([]);
//   };

//   return (
//     <section>
//       {/* Metrics Cards */}
//       <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-6">
//         <div className="dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF]">
//               Total Users
//             </h1>
//             <div className="p-3 bg-blue-100 rounded-full text-blue-600">
//               <Users size={24} />
//             </div>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-700 dark:text-[#D0CDEF]">
//             {cardData?.total_users}
//           </h1>
//         </div>

//         <div className="dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF]">
//               Subscribe Amount
//             </h1>
//             <div className="p-3 bg-green-100 rounded-full text-green-600">
//               <TbUserDollar className="text-2xl" />
//             </div>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-700 dark:text-[#D0CDEF]">
//             $ {cardData?.total_amount}
//           </h1>
//         </div>

//         <div className="dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF]">
//               Active Users
//             </h1>
//             <div className="p-3 bg-amber-100 rounded-full text-amber-600">
//               <ShieldCheck size={24} />
//             </div>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-700 dark:text-[#D0CDEF]">
//             {cardData?.active_user}
//           </h1>
//         </div>
//       </div>

//       {/* PDF Upload Section */}
//       <div className="mt-32 w-3/4 dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF] mb-4">
//           Upload PDFs
//         </h2>

//         <div
//           {...getRootProps()}
//           className={`border-2 border-dashed rounded-lg py-20 p-6 text-center cursor-pointer transition-colors duration-200 ${
//             isDragActive
//               ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
//               : "border-gray-300 dark:border-[#656092] dark:bg-[#24214A]"
//           }`}
//         >
//           <input {...getInputProps()} />
//           <p className="text-gray-600 dark:text-[#D0CDEF] mb-2">
//             {isDragActive
//               ? "Drop your PDF files here..."
//               : "Drag & drop PDF files here, or click to select"}
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             (Only *.pdf files are accepted)
//           </p>
//         </div>

//         {/* Uploaded Files with Progress */}
//         {uploadedFiles.length > 0 && (
//           <div className="mt-4">
//             <h3 className="text-lg font-medium text-gray-800 dark:text-[#D0CDEF] mb-2">
//               Selected Files
//             </h3>
//             <ul className="space-y-2">
//               {uploadedFiles.map((file, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center gap-2 text-gray-700 dark:text-[#D0CDEF]"
//                 >
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/11180/11180756.png"
//                     alt=""
//                     className="w-[20px] h-[20px]"
//                   />
//                   <span className="truncate">{file.name}</span>
//                   <span className="ml-auto text-sm">
//                     {uploadStatus[file.name] === "Success"
//                       ? "Success"
//                       : uploadStatus[file.name] === "Error"
//                       ? "Error"
//                       : uploadProgress[file.name] > 0
//                       ? `${uploadProgress[file.name]}%`
//                       : ""}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Preview Thumbnails */}
//         {pdfPreviews.length > 0 && (
//           <div className="mt-6 space-y-6">
//             {pdfPreviews.map((pdf, index) => (
//               <div
//                 key={index}
//                 className="border rounded-md shadow-sm p-2 bg-white dark:bg-[#2A2756]"
//               >
//                 <img
//                   src={pdf.url}
//                   alt={pdf.name}
//                   className="w-full max-w-xl mx-auto rounded"
//                 />
//                 <p className="mt-2 text-sm text-center text-gray-700 dark:text-[#D0CDEF]">
//                   {pdf.name}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="mt-10 flex justify-center">
//           <button
//             onClick={handleUpload}
//             className="flex items-center gap-2 dark:text-[#D0CDEF] font-semibold py-2 px-8 hover:dark:bg-[#222036] border border-white/30 shadow-sm shadow-amber-200"
//           >
//             Upload PDF <IoCloudUploadOutline size={25} />
//           </button>
//         </div>
//       </div>

//       {/* Upload Status Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0   bg-opacity-50 flex backdrop-blur-[3px] items-center justify-center z-50">
//           <div className="bg-white dark:bg-[#1B1744] border dark:border-white/20 rounded-lg p-6 w-full max-w-2xl shadow-lg">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF] mb-4">
//               Upload Status
//             </h2>

//             <div className="mb-4">
//               <p className="text-gray-700 dark:text-[#D0CDEF]">
//                 Progress: {uploadCount.current} / {uploadCount.total} PDFs
//               </p>
//             </div>

//             <div className="space-y-3 max-h-64 overflow-y-auto">
//               {uploadedFiles.map((file, index) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/11180/11180756.png"
//                     alt=""
//                     className="w-5 h-5"
//                   />
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-700 dark:text-[#D0CDEF] truncate">
//                       {file.name}
//                     </p>
//                     {uploadStatus[file.name] !== "Success" &&
//                       uploadStatus[file.name] !== "Error" && (
//                         <div className="w-full bg-gray-200 dark:bg-[#656092] rounded-full h-2">
//                           <div
//                             className="bg-blue-500 h-2 rounded-full"
//                             style={{
//                               width: `${uploadProgress[file.name] || 0}%`,
//                             }}
//                           ></div>
//                         </div>
//                       )}
//                   </div>
//                   <span
//                     className={`text-sm ${
//                       uploadStatus[file.name] === "Success"
//                         ? "text-green-600 dark:text-green-400"
//                         : uploadStatus[file.name] === "Error"
//                         ? "text-red-600 dark:text-red-400"
//                         : "text-gray-700 dark:text-[#D0CDEF]"
//                     }`}
//                   >
//                     {uploadStatus[file.name] === "Success"
//                       ? "Success"
//                       : uploadStatus[file.name] === "Error"
//                       ? "Error"
//                       : uploadStatus[file.name] === "Uploading"
//                       ? `${uploadProgress[file.name]}%`
//                       : "Pending"}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Error Messages */}
//             {uploadErrors.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-medium text-red-600 dark:text-red-400">
//                   Errors:
//                 </h3>
//                 <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400">
//                   {uploadErrors.map((error, index) => (
//                     <li key={index}>{error}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Summary and Close Button */}
//             {uploadCount.current === uploadCount.total && (
//               <div className="mt-4">
//                 <p className="text-green-600 dark:text-green-400 font-medium">
//                   Upload Completed!
//                 </p>
//               </div>
//             )}

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="px-6 cursor-pointer py-2 dark:bg-[#58538b] text-white rounded hover:bg-blue-600 dark:hover:bg-[#413d72]"
//                 disabled={uploadCount.current < uploadCount.total}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default AdminHome;