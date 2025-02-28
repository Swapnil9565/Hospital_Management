import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginationComponent from "../../Components/Admin/PaginationComponent";
import CheckMsgSkeleton from "./Skeletons/CheckMsgSkeleton";
const CheckMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          "https://hospital-management-99yz.onrender.com/api/admin/fetchMessages",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessages(res.data.messages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);
  
  //Pagination Logic
  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const currentRows = messages.slice(firstRowIndex, lastRowIndex);
  
  const handlePageChange=(e,page)=>{
    setCurrentPage(page);
}
  return (
    <div>
      <div className='h-[83vh] border-2 border-black m-5 rounded-md'>
        <h1 className='font-bold text-2xl text-green-900 uppercase m-5'>
          All Messages
        </h1>

        {loading ? (
          <CheckMsgSkeleton/>
        ) : (
          <table className='w-full border-collapse mt-10 border-separate border-spacing-y-3'>
            <thead>
              <tr className='px-8 text-center'>
                <th>Serial No.</th>
                 <th>Name</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages?.length > 0 ? (
                currentRows.map((message, index) => (
                  <tr key={index} className='text-center odd:bg-blue-200'>
                    <td>{firstRowIndex + index + 1}</td>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.contact}</td>
                    <td>{message.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='8' className='text-center text-red-500'>
                    No Messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
     
        <PaginationComponent totalItems={messages.length} currentPage={currentPage} rowsPerPage={rowsPerPage} onPageChange={handlePageChange}/> 
      </div>
    </div>
  );
};

export default CheckMessages;
