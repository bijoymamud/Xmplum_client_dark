




import React, { useState, useEffect } from 'react'
import { useLoggeInUserQuery } from '../../redux/features/baseApi'
import { IoLocation, IoMailUnreadOutline } from 'react-icons/io5'
import { SlCalender } from 'react-icons/sl'
import { IoMdCreate } from 'react-icons/io'
import { MdOutlineSaveAs } from 'react-icons/md'
import { RiEdit2Fill } from 'react-icons/ri'

const UserProfile = () => {
  const { data: userInfo } = useLoggeInUserQuery()

  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (userInfo?.full_name) {
      setNewName(userInfo.full_name)
    }
  }, [userInfo])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  const handleNameChange = () => setIsEditing(true)
  const handleNameSave = () => {
    setIsEditing(false)
    
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="bg-base-100 p-6 rounded-2xl shadow-xl w-full max-w-3xl space-y-6">
        {/* Profile Picture + Info */}
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
              <span className='dark:text-[#D0CDEF]'>Los Angeles</span>
              <IoLocation size={20} className="text-[#7376ff]" />
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <span className='dark:text-[#D0CDEF]'>Joined on 18 Aug, 2024</span>
              <SlCalender size={18} className="text-[#7376ff]" />
            </div>
            <div className="font-medium dark:text-[#D0CDEF]">{userInfo?.username}</div>
          </div>
        </div>

        {/* Name and Email */}
        <div className="text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border-b border-[#7376ff] dark:text-[#D0CDEF] bg-transparent text-xl font-semibold focus:outline-none w-full max-w-sm text-center sm:text-left"
                />
                <button
                  onClick={handleNameSave}
                  className="text-sm text-[#7376ff] hover:underline"
                >
                  <MdOutlineSaveAs size={24} />
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold dark:text-[#D0CDEF]">{newName}</h2>
                <button
                  onClick={handleNameChange}
                  className="text-sm text-[#7376ff] hover:underline"
                >
                  <RiEdit2Fill size={24}/> 
                </button>
              </>
            )}
          </div>
          <p className="text-base-content/70 mt-1 dark:text-[#D0CDEF] flex items-center gap-2"><IoMailUnreadOutline size={20}/> {userInfo?.email}</p>
        </div>
      </div>
    </section>
  )
}

export default UserProfile

