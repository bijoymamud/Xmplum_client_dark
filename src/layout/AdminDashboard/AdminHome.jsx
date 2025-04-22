import React, { useState } from "react";
import { ShieldCheck, Users, CheckCircle } from "lucide-react";
import { TbUserDollar } from "react-icons/tb";
import { useDarkMood } from "../../Context/ThemeContext";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import "react-toastify/dist/ReactToastify.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDashboardInfoQuery } from "../../redux/features/baseApi";

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;

const AdminHome = () => {
  const { darkMode } = useDarkMood();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [pdfPreviews, setPdfPreviews] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]); 
  const {data:cardData} = useDashboardInfoQuery();

  const onDrop = async (acceptedFiles) => {
    const pdfs = acceptedFiles.filter(file => file.type === "application/pdf");
    if (pdfs.length === 0) {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setFilesToUpload(pdfs); 
    setUploadedFiles(pdfs.map(file => ({ name: file.name }))); 
    toast.success("PDFs selected successfully!");
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
      toast.error("No PDFs selected to upload.");
      return;
    }

    const formData = new FormData();
    filesToUpload.forEach((file) => {
      formData.append(`pdfs`, file); 
    });

    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('http://192.168.10.131:8000/api/v1/chat_bot/upload-pdfs/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload PDFs');
      }

      const result = await response.json();
      toast.success("PDFs uploaded successfully to the server!");
      console.log("Upload response:", result);

      setFilesToUpload([]);
      setUploadedFiles([]);
      setPdfPreviews([]);
    } catch (error) {
      toast.error("Error uploading PDFs: " + error.message);
      console.error("Upload error:", error);
    }
  };

  return (
    <section>
      {/* Metrics Cards */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-6">
        <div className="dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF]">Total Users</h1>
            <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Users size={24} /></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-[#D0CDEF]">{cardData?.total_users}</h1>
        </div>

        <div className="dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF]">Subscribe Amount</h1>
            <div className="p-3 bg-green-100 rounded-full text-green-600"><TbUserDollar className="text-2xl" /></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-[#D0CDEF]">$ {cardData?.total_amount}</h1>
        </div>

        <div className="dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF]">Active Users</h1>
            <div className="p-3 bg-amber-100 rounded-full text-amber-600"><ShieldCheck size={24} /></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-700 dark:text-[#D0CDEF]">{cardData?.active_user}</h1>
        </div>
      </div>

      {/* PDF Upload Section */}
      <div className="mt-32 w-3/4 dark:bg-[#1B1744] border border-white/20 shadow-md rounded-lg p-6 ">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-[#D0CDEF] mb-4">Upload PDFs</h2>

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
            {isDragActive ? "Drop your PDF files here..." : "Drag & drop PDF files here, or click to select"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">(Only *.pdf files are accepted)</p>
        </div>

        {/* Uploaded Names */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-[#D0CDEF] mb-2">Uploaded Files</h3>
            <ul className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-[#D0CDEF] hover:underline cursor-pointer">
                  <img src="https://cdn-icons-png.flaticon.com/512/11180/11180756.png" alt="" className="w-[20px] h-[20px]"/>
                  <span className="truncate">{file.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Preview Thumbnails */}
        {pdfPreviews.length > 0 && (
          <div className="mt-6 space-y-6">
            {pdfPreviews.map((pdf, index) => (
              <div key={index} className="border rounded-md shadow-sm p-2 bg-white dark:bg-[#2A2756]">
                <img src={pdf.url} alt={pdf.name} className="w-full max-w-xl mx-auto rounded" />
                <p className="mt-2 text-sm text-center text-gray-700 dark:text-[#D0CDEF]">{pdf.name}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleUpload}
            className="flex items-center gap-2 dark:text-[#D0CDEF] font-semibold py-2 px-8 hover:dark:bg-[#222036] border border-white/30 shadow-sm shadow-amber-200"
          >
            Upload PDF <IoCloudUploadOutline size={25} />
          </button>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </section>
  );
};

export default AdminHome;
