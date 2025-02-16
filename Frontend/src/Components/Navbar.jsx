import React, { useEffect, useState } from 'react'
import { useNavigate,NavLink,Link } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Navbar({isLoggedIn,setIsLoggedIn}) {
  const navigate=useNavigate();
  const [logoutBtn,setLogoutBtn]=useState(false);
   const [userData,setUserData]=useState({});

  const showLogoutBtn=()=>{
    setLogoutBtn(!logoutBtn);
  }

  const token=localStorage.getItem("token");

  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
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

  useEffect(()=>{
    if(token){
       setIsLoggedIn(true);
    } 
    const user=localStorage.getItem("user");
    setUserData(JSON.parse(user));    
  },[])
  return (
    <nav className="w-full bg-gray-800 p-4">
      <ToastContainer className="w-[25vw]"/>
        <div className="mx-auto flex justify-between items-center">
            <div className="text-white text-3xl font-bold cursor-pointer transition-all transform hover:scale-105" onClick={()=>navigate("/")}>
                Med<span className='text-blue-300'>Zone</span>
            </div>
            {isLoggedIn?
             <div className="flex items-center gap-5 text-white cursor-pointer" onClick={showLogoutBtn}>
             <p className='text-xl'>Welcome,<span className='mx-1'>{userData?.username?.split(" ")[0]}</span></p>
             <p className='rounded-full px-3 py-2 bg-red-400 text-white text-lg'>{userData.username.slice(0,2).toUpperCase()}</p>
             {logoutBtn?<div className=' w-26 rounded-md p-2 absolute bg-blue-200 top-16 right-1 '>
              <p className='text-black font-semibold py-1'>{userData.email}</p>
              <button className="text-black font-semibold cursor-pointer py-1">Edit Profile</button><br />
              <button className="text-red-500 cursor-pointer py-1 font-semibold" onClick={handleLogout}>Log Out</button>
              </div>:
              <></>}
           </div>:
            <div className="flex gap-5 justify-between items-center">
                        <button className="py-2 px-2 rounded-md bg-blue-900 text-white cursor-pointer"><Link to="/register">Sign Up</Link></button>
                        <button className="py-2 px-2 rounded-md bg-blue-900 text-white cursor-pointer"><Link to="/login">Log In</Link></button>
            </div>
            }
       </div>
    </nav>
  )
}

export default Navbar