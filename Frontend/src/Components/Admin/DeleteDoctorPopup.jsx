import axios from 'axios'
import React, { useEffect } from 'react'
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
const DeleteDoctorPopup = ({setIsOpenDeletePopup,doctorId}) => {
    
        const handleDeleteDoctor=async()=>{
            if (!doctorId) return;
            try {
                const res=await axios.delete(`https://hospital-management-pe6s.onrender.com/api/admin/deleteDoctor/${doctorId}`,{
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                if(res.status===200){
                     toast.success(res.data.message,{
                        position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                     })
                  setIsOpenDeletePopup(false);
                }
            } catch (error) {
                toast.error( error.response?.data?.message || "Something went wrong while deleting doctor",{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
           
         }
   

  return (
    <div className='w-60 h-32 bg-slate-900 text-white p-5 rounded-md'>
        <p className='text-lg text-center mb-5'>Are you sure you want to delete this doctor?</p>
        <div className="flex justify-between items-center gap-5 px-5">
            <button className='text-blue-400' onClick={handleDeleteDoctor} >Confirm</button>
            <p>|</p>
            <button onClick={()=>setIsOpenDeletePopup(false)}>Cancel</button>
        </div>
        
    </div>
  )
}

export default DeleteDoctorPopup