import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify";
import MyBookingSkeleton from "./Skeletons/MyBookingSkeleton";
const MyBooking = () => {
  const navigate=useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [bookingData, setBookingData] = useState([]);
  const [deletingId,setDeletingId]=useState(null);
  

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!userData._id) return;
        const res = await axios.get(
          `https://hospital-management-99yz.onrender.com/api/user/fetchBooking/${userData._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
      if (res.status === 200) {
        setBookingData(res.data.myBookings);
        }
      
      } catch (error) {
        if(error.response?.status === 404){
          toast.error("Bookings not found", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }else{

          toast.error("Something went wrong while fetching bookings", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } finally {
        setLoading(false);
      }
    };
    if (userData._id) {
      fetchBookings();
    }
  }, [userData]);
  
  const cancelAppointment=async(appoId)=>{
    try {
      const res=await axios.delete(`https://hospital-management-99yz.onrender.com/api/user/cancelAppointment/${appoId}`,{
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(res.status==200){
        setDeletingId(appoId);
        return toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong while cancelling appointment", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
   
  }
  return (
    <div>
      <ToastContainer className='mt-10 w-[25vw]' />
      <div className="max-w-3xl mx-auto p-2">
      {loading ? (
          <MyBookingSkeleton/>
        ) :bookingData?.length > 0 ? (             
              bookingData.map((data, index) => (
                <div
                  key={index}
                  className={`${deletingId===data._id?"bg-transparent opacity-50":"bg-white"}   flex flex-col md:flex-row items-center justify-between p-3 border border-gray-300 rounded-lg shadow-sm mb-2`}>
                  <div className='w-full md:w-3/4 space-y-2'>
                    <p className='text-lg font-semibold'>
                      {data.fName} {data.lName}
                    </p>
                    <p className='flex justify-between text-sm text-gray-600'>
                      Department: {data.department}
                    </p>
                    <p className='text-sm text-gray-600'>Email: {data.email}</p>
                    <p className='text-sm text-gray-600'>
                      Mobile: {data.mobile}
                    </p>
                    <p className='text-sm text-gray-600'>Date: {data.date}</p>
                    <p className='text-sm text-gray-600'>Time: {data.time}</p>
                  </div>
                  <div className='flex flex-row gap-4 self-start text-sm'>
                    <button className={`${deletingId===data._id?"bg-red-200 cursor-not-allowed":"bg-red-500 cursor-pointer"} px-2 py-1 text-white  rounded-md transition`} onClick={()=>cancelAppointment(data._id)} disabled={deletingId ? true : false}>
                     {deletingId===data._id?"Cancelled":"Cancel"}
                    </button>
                    <button className={`${deletingId===data._id?"bg-blue-200 cursor-not-allowed":"bg-blue-800 cursor-pointer"} px-2 py-1 text-white  rounded-md transition `} disabled={deletingId ? true : false} onClick={()=>navigate(`/appointment/${data._id}`)}>
                      Reschedule
                    </button>
                  </div>
                </div>
              ))
        
            ) : (
              <p className='text-center text-gray-600'>No bookings found.</p>
            )}
          
      </div>
    </div>
  );
};

export default MyBooking;
