import React, { useEffect, useState } from 'react'
import adminAvatar from "../../Assets/admin-avatar.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faDashboard, faHouse, faMessage, faUser, faUserDoctor, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  
  const [showSidebarText,setShowSidebarText]=useState(null);
  const [userData, setUserData] = useState({});
    
    useEffect(() => {
      const token=localStorage.getItem("token")
      if(token){
        const data=localStorage.getItem("user");
        setUserData(JSON.parse(data));
      }
    }, [])

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Update state on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems=[
        {id:1,icon:faHouse,text:"Dashboard",path:"dashboard",iconColor:"blueViolet"},
        {id:2,icon:faUserDoctor,text:"Doctors",path:"doctors",iconColor:"red"},
        {id:3,icon:faUser,text:"Users",path:"allUsers",iconColor:"springgreen"},
        {id:4,icon:faCalendarCheck,text:"Check Appointments",path:"checkAppointments",iconColor:"violet"},
        {id:5,icon:faUserPlus,text:"Add a doctor",path:"addDoctors",iconColor:"tomato"},
        {id:6,icon:faMessage,text:"Messages",path:"messages",iconColor:"green"},
    ]

  return (
    <div className='w-[14vw] md:w-[20vw] h-[113vh] md:h-screen text-black bg-slate-900'>
      <div className='flex flex-col items-center justify-center bg-[#053A6F] text-white py-5'>
         <img src={adminAvatar} alt="admin-avatar" className='w-12 md:w-24'/>    
         <p className='hidden md:block text-sm text-gray-400 my-2'>Admin</p>
         <p className='hidden md:block'>{userData?.username}</p>
      </div>
      <div>
    <ul className="py-2 md:px-5 md:py-10 text-md text-white flex flex-col items-center gap-y-5 md:gap-y-0 md:items-start ">
         
         {menuItems.map(({id,icon,text,path,iconColor})=>{
             return  <li className="mb-3 cursor-pointer" key={id} onMouseEnter={()=>setShowSidebarText(id)} onMouseLeave={()=>setShowSidebarText(null)}>
                 <NavLink to={`/admin/${path}`} className="flex gap-5 items-center px-2 py-1">
                 <FontAwesomeIcon icon={icon} size="lg" color={iconColor} />
                 <span className="hidden md:block">{text}</span>
             </NavLink>
             {isMobile&&showSidebarText===id&& <span className="absolute left-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-md">
                        {text}</span>}
            </li>
         })}

       
      
    </ul>
</div>

    </div>
  )
}

export default Sidebar