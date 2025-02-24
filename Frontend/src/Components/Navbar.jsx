import React, { useEffect, useRef, useState } from 'react'
import "../ToastStyles.css"
import { useNavigate,Link } from 'react-router-dom'

import "react-toastify/dist/ReactToastify.css";

function Navbar({isLoggedIn,setIsLoggedIn}) {
  const navigate=useNavigate();
   const [userData,setUserData]=useState({});
 
  const token=localStorage.getItem("token");

 useEffect(()=>{
    if(token){
       setIsLoggedIn(true);
    } 
    const user=localStorage.getItem("user");
    setUserData(JSON.parse(user));    
  },[token])

  const getInitials = (name) => {
    if (!name) return ""

    const words = name.trim().split(" ");
    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
      } else {
        return words.map(word => word[0]).join("").toUpperCase();
      }
  };
  return (
    <>
    <nav className="w-full bg-gray-800 p-2 md:p-4">
        <div className="mx-auto flex justify-between items-center">
            <div className="text-white text-xl md:text-3xl font-bold cursor-pointer transition-all transform hover:scale-105" onClick={()=>navigate("/")}>
                Med<span className='text-blue-300'>Zone</span>
            </div>
            {isLoggedIn?
             <div className="flex items-center gap-3 md:gap-5 text-white cursor-pointer">
             <p className='text-md md:text-xl'>Welcome,<span className='mx-1'>{userData?.username?.split(" ")[0]}</span></p>
             <p className='flex items-center rounded-full px-2 md:px-3 py-1 md:py-2 bg-red-400 text-white md:text-lg' onClick={()=>navigate("/userDashboard")}>{getInitials(userData?.username)}</p>
           </div>:
            <div className="flex gap-5 justify-between items-center">
                        <button className="p-1 text-sm md:text-md md:p-2 rounded-md bg-blue-900 text-white cursor-pointer"><Link to="/register">Sign Up</Link></button>
                        <button className="p-1 text-sm md:text-md  md:p-2 rounded-md bg-blue-900 text-white cursor-pointer"><Link to="/login">Log In</Link></button>
            </div>
            }
       </div>
    </nav>
    
    </>
   
  )
}

export default Navbar