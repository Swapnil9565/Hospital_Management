import React from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck, faMessage, faUserPlus, faUsers} from "@fortawesome/free-solid-svg-icons"
const Dashboard = () => {
  return (
    <div className='bg-[#fcf9f5] h-[90vh]'>
      <div className='pt-5 mx-5 mb-5 md:mb-20'>
       <p className='font-bold text-2xl text-blue-900'>Welcome Admin...!</p>
      </div>
      <div className='grid grid-cols-2 place-items-center gap-5 md:gap-10'>
        <div className='flex flex-col items-center justify-center gap-3 w-32 md:w-64 p-3 md:p-10 shadow-xl bg-white transform transition-all hover:scale-105'>
          <FontAwesomeIcon icon={faUsers} size='xl' color='white' className='bg-[#053A6F] w-[5vw] p-3 rounded-tr-lg rounded-bl-lg'/>
          <h4 className='text-sm md:text-lg font-semibold'>Doctors List</h4>
          <p className='text-sm text-[#053A6F] cursor-pointer'><Link to="/admin/doctors">View Doctors</Link></p>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 w-32 md:w-64 p-3 md:p-10 shadow-xl bg-white transform transition-all hover:scale-105'>
          <FontAwesomeIcon icon={faCalendarCheck} size='xl' color='white' className='bg-[#053A6F] w-[5vw] p-3 rounded-tr-lg rounded-bl-lg'/>
          <h4 className='text-sm md:text-lg font-semibold'>Appointments</h4>
          <p className='text-sm text-[#053A6F] cursor-pointer text-center md:text-start'><Link to="/admin/checkAppointments">View Appointments</Link></p>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 w-32 md:w-64 p-3 md:p-10 shadow-xl bg-white transform transition-all hover:scale-105'>
          <FontAwesomeIcon icon={faUserPlus} size='xl' color='white' className='bg-[#053A6F] w-[5vw] p-3 rounded-tr-lg rounded-bl-lg'/>
          <h4 className='text-sm md:text-lg font-semibold text-center'>Manage Doctors</h4>
          <p className='text-sm text-[#053A6F] cursor-pointer'><Link to="/admin/addDoctors">Add Doctors</Link></p>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 w-32 md:w-64 p-3 md:p-10 shadow-xl bg-white transform transition-all hover:scale-105'>
          <FontAwesomeIcon icon={faMessage} size='xl' color='white' className='bg-[#053A6F] w-[5vw] p-3 rounded-tr-lg rounded-bl-lg'/>
          <h4 className='text-sm md:text-lg font-semibold'>Messages</h4>
          <p className='text-sm text-[#053A6F] cursor-pointer'><Link to="/admin/messages">View messages</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard