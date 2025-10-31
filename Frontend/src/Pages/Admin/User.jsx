import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../Components/Admin/PaginationComponent";
import UserSkeleton from "./Skeletons/UserSkeleton";
const User = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://hospital-management-pe6s.onrender.com/api/admin/fetchUsers",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          setUsers(res.data.users);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const currentRows = users.slice(firstRowIndex, lastRowIndex);

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
    <div className='h-screen md:h-[83vh] border-2 border-black m-2 md:m-5 rounded-md md:overflow-hidden overflow-x-auto'>
      <h1 className='font-bold text-xl md:text-2xl text-green-900 uppercase m-5'>
        All Users
      </h1>
  
      {loading ? (
        <UserSkeleton rows={10} columns={5}/>
      ) : (
        <div className='w-full md:overflow-hidden overflow-x-auto'>
          <table className='w-full border-collapse mt-0 md:mt-10 border-separate border-spacing-y-3 text-sm md:text-base'>
            <thead>
              <tr className='text-center'>
                <th>Sr No.</th>
                <th>User Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                currentRows.map((user, index) => (
                  <tr key={index} className='text-center odd:bg-blue-200'>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="cursor-pointer"><FontAwesomeIcon icon={faTrash} color="red"/></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='text-center text-red-500'>
                    No Users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <PaginationComponent
        totalItems={users.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        className="relative mt-5"
      />
    </div>
  </div>
  
  );
};

export default User;
