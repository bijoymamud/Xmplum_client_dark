// import React, { useState, useEffect } from 'react'

// import { useLoggeInUserQuery } from '../../redux/features/baseApi'
// import { IoLocation, IoMailUnreadOutline } from 'react-icons/io5'
// import { SlCalender } from 'react-icons/sl'
// import { IoMdCreate } from 'react-icons/io'
// import { RiEdit2Fill } from 'react-icons/ri'

// const UserProfile = () => {
//   const { data: userInfo } = useLoggeInUserQuery()

//   const [isEditing, setIsEditing] = useState(false)
//   const [newName, setNewName] = useState('')
//   const [image, setImage] = useState(null)
//   const [imageFile, setImageFile] = useState(null)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)

//   useEffect(() => {
//     if (userInfo?.full_name) {
//       setNewName(userInfo.full_name)
//     }
//     if (userInfo?.profile_picture) {
//       setImage(userInfo.profile_picture)
//     }
//   }, [userInfo])

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setImage(URL.createObjectURL(file))
//       setImageFile(file)
//     }
//   }

//   const handleProfileUpdate = async () => {
//     try {
//       const formData = new FormData()
//       if (newName !== userInfo?.full_name) {
//         formData.append('full_name', newName)
//       }
//       if (imageFile) {
//         formData.append('image', imageFile) 
//       }

//       if (!newName && !imageFile) {
//         setError('No changes to update')
//         return
//       }

//       const accessToken = localStorage.getItem("access_token")
//       const response = await fetch(
//         'http://192.168.10.131:8000/api/v1/users/profile/update/',
//         {
//           method: 'PUT',
//           body: formData,
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )

//       if (!response.ok) {
//         throw new Error('Failed to update profile')
//       }

//       const data = await response.json()
//       setSuccess('Profile updated successfully')
//       setError(null)
//       setIsEditing(false)
//       if (data.profile_picture) {
//         setImage(data.profile_picture) 
//       }
//       setImageFile(null) 
//     } catch (err) {
//       setError(err.message)
//       setSuccess(null)
//     }
//   }

//   const handleNameChange = () => setIsEditing(true)

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
//       <div className="bg-base-100 p-6 rounded-2xl shadow-xl w-full max-w-3xl space-y-6">

//         {error && <div className="text-red-500 text-center">{error}</div>}
//         {success && <div className="text-green-500 text-center">{success}</div>}

//         <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
//           <div className="relative group">
//             <img
//               src={
//                 image ||
//                 'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg'
//               }
//               alt="Profile"
//               className="w-[150px] h-[150px] object-cover rounded-full border-4 border-white shadow-md cursor-pointer"
//               onClick={() => document.getElementById('image-upload').click()}
//             />
//             <input
//               id="image-upload"
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//             <div
//               className="absolute top-1 right-1 bg-white p-1.5 rounded-full shadow-md cursor-pointer group-hover:scale-110 transition"
//               onClick={() => document.getElementById('image-upload').click()}
//               title="Change photo"
//             >
//               <IoMdCreate size={18} color="#7376ff" />
//             </div>
//           </div>

//           <div className="text-sm text-base-content/80 text-center sm:text-right space-y-2">
//             <div className="flex items-center justify-center sm:justify-end gap-2">
//               <span className='dark:text-[#D0CDEF]'>Los Angeles</span>
//               <IoLocation size={20} className="text-[#7376ff]" />
//             </div>
//             <div className="flex items-center justify-center sm:justify-end gap-2">
//               <span className='dark:text-[#D0CDEF]'>Joined on 18 Aug, 2024</span>
//               <SlCalender size={18} className="text-[#7376ff]" />
//             </div>
//             <div className="font-medium dark:text-[#D0CDEF]">{userInfo?.username}</div>
//           </div>
//         </div>

//         {/* Name and Email */}
//         <div className="text-center sm:text-left">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={newName}
//                 onChange={(e) => setNewName(e.target.value)}
//                 className="border-b border-[#7376ff] dark:text-[#D0CDEF] bg-transparent text-xl font-semibold focus:outline-none w-full max-w-sm text-center sm:text-left"
//               />
//             ) : (
//               <h2 className="text-2xl font-bold dark:text-[#D0CDEF]">{newName}</h2>
//             )}
//             <button
//               onClick={handleNameChange}
//               className="text-sm text-[#7376ff] hover:underline"
//             >
//               <RiEdit2Fill size={24}/>
//             </button>
//           </div>
//           <p className="text-base-content/70 mt-1 dark:text-[#D0CDEF] flex items-center gap-2">
//             <IoMailUnreadOutline size={20}/> {userInfo?.email}
//           </p>
//         </div>

//         {/* Universal Update Button */}
//         <div className="text-center">
//           <button
//             onClick={handleProfileUpdate}
//             className="bg-[#7376ff] text-white px-6 py-2 rounded-full hover:bg-[#5f61d6] transition duration-300"
//           >
//             Update Profile
//           </button>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default UserProfile



import React, { useState, useEffect } from 'react';
import { useLoggeInUserQuery } from '../../redux/features/baseApi';
import { IoLocation, IoMailUnreadOutline } from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';
import { IoMdCreate } from 'react-icons/io';
import { RiEdit2Fill, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDateRange } from 'react-icons/md';

const UserProfile = () => {
  const { data: userInfo } = useLoggeInUserQuery();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  useEffect(() => {
    if (userInfo?.full_name) {
      setNewName(userInfo.full_name);
    }
    if (userInfo?.profile_picture) {
      setImage(userInfo.profile_picture);
    }
  }, [userInfo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
      setShowUpdateButton(true);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      if (newName !== userInfo?.full_name) {
        formData.append('full_name', newName);
      }
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (!newName && !imageFile) {
        setError('No changes to update');
        return;
      }

      const accessToken = localStorage.getItem('access_token');
      const response = await fetch('http://192.168.10.131:8000/api/v1/users/profile/update/', {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      toast.success('Profile updated successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError(null);
      setIsEditing(false);
      setShowUpdateButton(false);
      if (data.profile_picture) {
        setImage(data.profile_picture);
      }
      setImageFile(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNameChange = () => {
    setIsEditing(true);
    setShowUpdateButton(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="bg-base-100 p-6 rounded-2xl shadow-xl w-full max-w-3xl space-y-6">
        <ToastContainer />
        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
          <div className="relative group">
            <img
              src={
                image ||
                'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg'
              }
              alt="Profile"
              className="w-[150px] h-[150px] object-cover rounded-full border-4 border-white shadow-md cursor-pointer"
              onClick={() => document.getElementById('image-upload').click()}
            />
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div
              className="absolute top-1 right-1 bg-white p-1.5 rounded-full shadow-md cursor-pointer group-hover:scale-110 transition"
              onClick={() => document.getElementById('image-upload').click()}
              title="Change photo"
            >
              <IoMdCreate size={18} color="#7376ff" />
            </div>
          </div>

          <div className="text-sm text-base-content/80 text-center sm:text-right space-y-2">
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <span className="dark:text-[#D0CDEF]">Los Angeles</span>
              <IoLocation size={20} className="text-[#7376ff]" />
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <span className="dark:text-[#D0CDEF]">Joined on 18 Aug, 2024</span>
              <SlCalender size={18} className="text-[#7376ff]" />
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <span className="dark:text-[#D0CDEF]">Premium</span>
              <RiMoneyDollarCircleLine size={24} className="text-[#7376ff]" />
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <span className="dark:text-[#D0CDEF]">Expiry: 18 Sept, 2024</span>
              <MdDateRange  size={22} className="text-[#7376ff]" />
            </div>
            <div className="font-medium dark:text-[#D0CDEF]">{userInfo?.username}</div>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border-b border-[#7376ff] dark:text-[#D0CDEF] bg-transparent text-xl font-semibold focus:outline-none w-full max-w-sm text-center sm:text-left"
              />
            ) : (
              <h2 className="text-2xl font-bold dark:text-[#D0CDEF]">{newName}</h2>
            )}
            <button
              onClick={handleNameChange}
              className="text-sm text-[#7376ff] hover:underline"
            >
              <RiEdit2Fill size={24} />
            </button>
          </div>
          <p className="text-base-content/70 mt-1 dark:text-[#D0CDEF] flex items-center gap-2">
            <IoMailUnreadOutline size={20} /> {userInfo?.email}
          </p>
        </div>

        {showUpdateButton && (
          <div className="text-center">
            <button
              onClick={handleProfileUpdate}
              className="bg-[#7376ff] text-white px-6 py-2 rounded-full hover:bg-[#5f61d6] transition duration-300"
            >
              Update Profile
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;