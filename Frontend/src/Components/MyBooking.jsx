import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify"
const MyBooking = () => {
  const [userData,setUserData]=useState({});
  const [bookingData,setBookingData]=useState({});

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);
  
  useEffect(()=>{
    const fetchBookings=async()=>{
      try {
        if (!userData._id) return;
        const res=await axios.get(`https://hospital-management-99yz.onrender.com/api/user/fetchBooking/${userData._id}`,{
          headers:{
            "Content-Type":"application/json"
          }
        })
        if(res.status===200){
          setBookingData(res.data.myBookings);
        }
      } catch (error) {
          toast.error("Something went wrong while fetching bookings", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
      } 
    }

    fetchBookings();
  },[userData])
  console.log(bookingData);
  return (
    <div>
      <ToastContainer className='mt-10 w-[25vw]' />
    <div className="max-w-3xl mx-auto p-2">
  {bookingData?.length > 0 ? (
    bookingData.map((data, index) => (
      <div
        key={index}
        className="flex flex-col md:flex-row items-center justify-between p-3 border border-gray-300 rounded-lg shadow-sm mb-2"
      >
  
        <div className="w-full md:w-3/4 space-y-2">
          <p className="text-lg font-semibold">
            {data.fName} {data.lName}
          </p>
          <p className="text-sm text-gray-600">Department: {data.department}</p>
          <p className="text-sm text-gray-600">Email: {data.email}</p>
          <p className="text-sm text-gray-600">Mobile: {data.mobile}</p>
          <p className="text-sm text-gray-600">Date: {data.date}</p>
          <p className="text-sm text-gray-600">Time: {data.time}</p>
        </div>
        <div className="flex flex-row gap-4 self-start text-sm">
          <button className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md transition cursor-pointer">
            Cancel
          </button>
          <button className="px-2 py-1 text-white bg-blue-800 hover:bg-blue-600 rounded-md transition cursor-pointer">
            Reschedule
          </button>
        </div>
        
      </div>
    ))
  ) : (
    <p className="text-center text-gray-600">No bookings found.</p>
  )}
</div>


    </div>
  )
}

export default MyBooking