import React, { useEffect, useState } from 'react'
import adminAvatar from "../../Assets/admin-avatar.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faHouse, faMessage, faUser, faUserDoctor, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  const [userData, setUserData] = useState({});
    
    useEffect(() => {
      const token=localStorage.getItem("token")
      if(token){
        const data=localStorage.getItem("user");
        setUserData(JSON.parse(data));
      }
    }, [])
  return (
    <div className='w-[20vw] h-screen text-black bg-slate-900'>
      <div className='flex flex-col items-center justify-center bg-[#053A6F] text-white py-5'>
         <img src={adminAvatar} alt="admin-avatar" className='w-24'/>    
         <p className='text-sm text-gray-400 my-2'>Admin</p>
         <p>{userData?.username}</p>
      </div>
        <div>
            <ul className='px-5 py-10 text-md text-white'>
                <li className='mb-3 cursor-pointer'><NavLink to="/admin/dashboard" className="flex gap-5 items-center px-2 py-1"><FontAwesomeIcon icon={faHouse} size="lg"  color='blueviolet'/>Dashboard</NavLink></li>
                <li className='mb-3 cursor-pointer'><NavLink to="/admin/doctors" className="flex gap-5 items-center px-2 py-1"><FontAwesomeIcon icon={faUserDoctor} size="lg"  color='red'/>Doctors</NavLink></li>
                <li className='mb-3 cursor-pointer'><NavLink to="/admin/allUsers" className="flex gap-5 items-center px-2 py-1"><FontAwesomeIcon icon={faUser} size="lg"  color='springgreen'/>Users</NavLink></li>
                <li className='mb-3 cursor-pointer'><NavLink to="/admin/checkAppointments" className="flex gap-5 items-center px-2 py-1"><FontAwesomeIcon icon={faCalendarCheck} size="lg"  color='violet'/>Check Appointments</NavLink></li>
                <li className='mb-3 cursor-pointer'><NavLink to="/admin/addDoctors" className="flex gap-5 items-center px-2 py-1"><FontAwesomeIcon icon={faUserPlus} size="lg"  color='tomato'/>Add a doctor</NavLink></li>
                <li className='mb-3 cursor-pointer'><NavLink to="/admin/messages" className="flex gap-5 items-center px-2 py-1"><FontAwesomeIcon icon={faMessage} size="lg"  color='green'/>Messages</NavLink></li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar