import React from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck, faMessage, faUserPlus, faUsers} from "@fortawesome/free-solid-svg-icons"
const Dashboard = () => {
  return (
    <div className='bg-[#fcf9f5] h-[90vh]'>
      <div className='pt-5 mx-5 mb-20'>
       <p className='font-bold text-2xl text-blue-900'>Welcome Admin...!</p>
      </div>
      <div className='grid grid-cols-2 place-items-center gap-10'>
        <div className='flex flex-col items-center justify-center gap-3 w-64 p-10 shadow-xl bg-white transform transition-all hover:scale-105'>
          <FontAwesomeIcon icon={faUsers} size='xl' color='white' className='bg-[#053A6F] p-3 rounded-tr-lg rounded-bl-lg'/>
          <h4 className='text-lg font-semibold'>Doctors List</h4>
          <p className='text-sm text-[#053A6F] cursor-pointer'><Link to="/admin/doctors">View Doctors</Link></p>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 w-64 p-10 shadow-xl bg-white transform transition-all hover:scale-105'>
          <FontAwesomeIcon icon={faCalendarCheck} size='xl' color='white' className='bg-[#053A6F] p-3 rounded-tr-lg rounded-bl-lg'/>
          <h4 className='text-lg font-semibold'>Appointments</h4>
          <p className='text-sm text-[#053A6F] cursor-pointer'><Link to="/admin/checkAppointments">View Appointments</Link></p>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 w-64 p-10 shadow-xl bg-white transform transition-all hover:scale-105'>
          <FontAwesomeIcon icon={faUserPlus} size='xl' color='white' className='bg-[#053A6F] p-3 rounded-tr-lg rounded-bl-lg'/>
          <h4 className='text-lg font-semibold'>Manage Doctors</h4>
          <p className='text-sm text-[#053A6F] cursor-pointer'><Link to="/admin/addDoctors">Add Doctors</Link></p>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 w-64 p-10 shadow-xl bg-white transform transition-all hover:scale-105'>
          <FontAwesomeIcon icon={faMessage} size='xl' color='white' className='bg-[#053A6F] p-3 rounded-tr-lg rounded-bl-lg'/>
          <h4 className='text-lg font-semibold'>Messages</h4>
          <p className='text-sm text-[#053A6F] cursor-pointer'><Link to="/admin/messages">View messages</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard