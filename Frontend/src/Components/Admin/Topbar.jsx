import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Topbar = () => {
  const navigate=useNavigate();

  const handleAdminLogout=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Admin logout successfully", {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    setTimeout(() => {
                      navigate("/login");
                      
                    }, 1500);

  }
  return (
    <div>
    <ToastContainer className="w-[25vw]"/>
    <div className='w-full md:w-[80vw] h-[12vh] md:h-[10vh] flex items-center justify-between px-2 md:px-10 gap-5 bg-zinc-900'>
        <p className='text-md md:text-xl font-bold tracking-wider text-blue-200'>MEDZONE</p>
        <p className='text-red-500 font-semibold cursor-pointer text-sm md:text-lg' onClick={handleAdminLogout}>Log Out <FontAwesomeIcon icon={faRightFromBracket}/></p>
    </div>
    </div>
  )
}

export default Topbar