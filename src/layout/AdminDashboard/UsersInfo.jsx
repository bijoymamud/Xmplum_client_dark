import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useGetAllUsersInfoQuery } from "../../redux/features/baseApi";

const UserList = () => {
  const { data: userInfo } = useGetAllUsersInfoQuery();
  // const [deleteUser, {isLoading}] = useDeleteUserMutation()
console.log(userInfo)

  const handleDeleteUser = (id)=> {
    console.log(id)
    // try {
    //   const response = deleteUser(id).unwrap();
    //   console.log(response)
    // } catch (error) {
    //   console.log("error deleting user", error)
    // }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-[#1B1744]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-[#D0CDEF]">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-[#2A2756]">
              <th className="px-4 py-2 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Name</th>
              <th className="px-4 py-2 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Email</th>
              <th className="px-4 py-2 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Package</th>
              <th className="px-4 py-2 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Plan Start</th>
              <th className="px-4 py-2 text-left text-base font-semibold text-gray-700 dark:text-gray-300">Expire Date</th>
              <th className="px-4 py-2 text-center text-base font-semibold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userInfo?.map((user) => (
              <tr key={user.user_id} className="border-t cursor-pointer border-gray-200 dark:border-[#444] hover:bg-gray-50 dark:hover:bg-[#3b435f]">
                <td className="px-4 py-3 text-sm text-gray-800 dark:text-[#D0CDEF]">{user.user_full_name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.user_email}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.plan_name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(user.start_date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(user.end_date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                  onClick={()=>handleDeleteUser(user?.user_id)}
                    className="inline-flex cursor-pointer items-center px-2 py-1 text-xs dark:text-white hover:dark:text-gray-300"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
