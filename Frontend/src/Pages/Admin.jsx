import React from "react"
import Sidebar from "../Components/Sidebar"
import Topbar from '../Components/Topbar'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='flex w-full'>
      <Sidebar/>
      <div>
      <Topbar/>
      <Outlet/>
      </div>
    </div>
  )
}

export default Admin