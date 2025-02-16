import axios from "axios";
import React, { useEffect, useState } from "react";
import PaginationComponent from "../../Components/Admin/PaginationComponent";
const User = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://hospital-management-99yz.onrender.com/api/admin/fetchUsers",
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
      <div className='h-[83vh] border-2 border-black m-5 rounded-md'>
        <h1 className='font-bold text-2xl text-green-900 uppercase m-5'>
          All Users
        </h1>

        {loading ? (
          <p className='text-center text-lg text-blue-600'>Fetching users...</p>
        ) : (
          <table className='w-full border-collapse mt-10 border-separate border-spacing-y-3'>
            <thead>
              <tr className='px-8 text-center'>
                <th>Sr No.</th>
                <th>User Id</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                currentRows.map((user, index) => (
                  <tr key={index} className='text-center px-8 odd:bg-blue-200'>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='8' className='text-center text-red-500'>
                    No Users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <PaginationComponent
          totalItems={users.length}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default User;
