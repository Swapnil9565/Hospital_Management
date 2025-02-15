import React, { useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom'

import heroImg from "../Assets/heroBg.jpeg"
import Navbar from "../Components/Navbar";
import About from '../Components/About';
import Staff from '../Components/Staff';
import DepartmentInfo from '../Components/DepartmentInfo';
import ServicesInfo from '../Components/ServicesInfo';
import Footer from '../Components/Footer';
import { ToastContainer,toast } from 'react-toastify';
import Message from '../Components/Admin/Message';

function Home() {
  let navigate=useNavigate();

  const [isLoggedIn,setIsLoggedIn]=useState(false);

  const staffRef=useRef(null);
  const scrollToStaff=()=>{
    staffRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  const handleAppointment=()=>{
    if(isLoggedIn){
      navigate("/appointment")
    }
    else{
      toast.error("Access denied! Please log in first.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
    <div className='h-screen'>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <div className="home h-[90vh]" style={{background:`url(${heroImg})`,backgroundPosition:"right top",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>  
    <div className="flex flex-col justify-center h-[70vh] px-3">
      <h1 className='underline text-4xl py-5 text-blue-800 font-bold'>Welcome to MedZone</h1>
      <p className='text-5xl py-2 font-medium'>Best healthcare Solution <br /> in your City</p>
      <div className="buttons mt-10 font-bold">
      <button className="bg-blue-200 rounded-md p-2 mx-3 transition-all hover:bg-blue-400" onClick={scrollToStaff}>Find Doctors</button>
      <button onClick={handleAppointment} className="bg-blue-200 rounded-md p-2 mx-3 transition-all hover:bg-blue-400">Appointment</button>
      </div>
    </div> 
    </div>
    </div>     
    <About/>
    <Staff staffRef={staffRef}/>
    <DepartmentInfo/>
    <ServicesInfo/>
    <Message/>
    <Footer/>
    </>
  )
}

export default Home