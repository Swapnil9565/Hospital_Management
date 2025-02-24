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
  },[])
  console.log(userData);
  console.log(bookingData);
  return (
    <div>
       <ToastContainer className='mt-10 w-[25vw]' />
      <div>
        MyBookings
      </div>

    </div>
  )
}

export default MyBooking