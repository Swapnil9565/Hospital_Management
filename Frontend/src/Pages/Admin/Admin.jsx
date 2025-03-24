import React from "react"
import Sidebar from "../../Components/Admin/Sidebar"
import Topbar from '../../Components/Admin/Topbar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='flex w-full'>
      <div>
      <Sidebar/>
      </div>
      <div className="w-full md:w-[80vw] ">
      <Topbar/>
      <Outlet/>
      </div>
    </div>
  )
}

export default Admin