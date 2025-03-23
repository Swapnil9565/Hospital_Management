import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import MyBooking from '../Components/MyBooking'
import Setting from '../Components/Setting'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserDashboard = () => {
  const navigate=useNavigate();
    const [userData,setUserData]=useState({});
    const [displaySection,setDisplaySection]=useState("MyBooking");

    const getInitials = (name) => {
        if (!name) return ""

        const words = name.trim().split(" ");
        if (words.length === 1) {
            return words[0].slice(0, 2).toUpperCase();
          } else {
            return words.map(word => word[0]).join("").toUpperCase();
          }
      };
    useEffect(()=>{
        const data=localStorage.getItem("user");
        setUserData(JSON.parse(data));
    },[]);

     const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        return toast.success("Logout successfully", {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      
                    });
      } 
       
      const handleDeleteAccount = async () => {
        try {
          if (!userData?._id) {
            return toast.error("User data is missing!", { position: "top-center" });
          }
      
          const res = await axios.delete(
            `https://hospital-management-99yz.onrender.com/api/user/deleteAccount/${userData._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          );
      
          if (res.status === 200) {
            toast.success("Account deleted successfully", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
    
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            
            setTimeout(() => {
              navigate("/register");
            }, 1500);
          }
        } catch (error) {
          console.error("Error deleting account:", error);
          toast.error(
            error.response?.data?.message || "Failed to delete account. Try again.",
            { position: "top-center" }
          );
        }
      };
      
  return (
  <div className='bg-[#F0F8FF] h-[160vh] md:h-screen'>
  {/* <ToastContainer className='mt-10 w-[25vw]' /> */}
  <FontAwesomeIcon icon={faArrowLeft} size='xl' color='blue' className='cursor-pointer mx-10 md:mx-[50px] my-4' onClick={()=>navigate("/")}/>
   <div className="flex flex-col md:flex-row gap-5 justify-center  pt-5">
    <div className="flex flex-col justify-between h-[70vh] px-3 mx-8 md:mx-0 md:px-10 shadow-md py-2 bg-white">
      <div>   
        <div className="profileImg flex items-center justify-center">
          <p className="flex items-center justify-center text-4xl w-20 h-20 rounded-full bg-violet-900 text-white font-bold">
            {getInitials(userData?.username)}
          </p>
        </div>
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-xl font-semibold">{userData?.username}</h2>
          <h4 className="text-gray-600">{userData?.email}</h4>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <button className="cursor-pointer text-white bg-slate-900 text-sm md:text-lg py-2 w-60 rounded-md" onClick={handleLogout}>Log out</button>
        <button className="cursor-pointer bg-red-500 text-white text-sm md:text-lg py-2 w-60  rounded-md" onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </div>
    <div className="flex flex-col md:w-[40vw] h-[70vh] mx-8 md:ml-10 p-4 bg-white">
      <div className="flex justify-center md:justify-start gap-5">
        <button className={`cursor-pointer py-1 text-sm md:text-lg px-4 border-2 border-blue-200 rounded-md ${displaySection==="MyBooking"?"bg-blue-800 text-white border-none":"bg-white text-black"}`} onClick={()=>setDisplaySection("MyBooking")}>My Bookings</button>
        <button className={`cursor-pointer py-1 text-sm md:text-lg px-4 border-2 border-blue-200 rounded-md ${displaySection==="Setting"?"bg-blue-800 text-white border-none":"bg-white text-black"}`} onClick={()=>setDisplaySection("Setting")}>Settings</button>
      </div>
      <div className="mt-3 overflow-y-scroll scrollbar-thin">
        {displaySection==="MyBooking"?<MyBooking />:<Setting />} 
      </div>
    </div>
  </div>
  </div>
  
  )
}

export default UserDashboard