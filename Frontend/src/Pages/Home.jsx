import React, { useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from "../Components/Navbar"
import heroImg from "../Assets/heroBg.jpeg"
import About from '../Components/About';
import Staff from '../Components/Staff';
import DepartmentInfo from '../Components/DepartmentInfo';
import ServicesInfo from '../Components/ServicesInfo';
import Footer from '../Components/Footer';
import { toast } from 'react-toastify';
import Message from '../Components/Admin/Message';
import Chatbot from '../Components/Chatbot';

function Home() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  let navigate=useNavigate();
 

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
    <div className="h-[40vh] md:h-[90vh]" style={{background:`url(${heroImg})`,backgroundPosition:"right top",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>  
    <div className="flex flex-col justify-center h-[45vh] md:h-[70vh] px-3">
      <h1 className='underline text-lg md:text-4xl py-3 md:py-5 text-blue-800 font-bold'>Welcome to MedZone</h1>
      <p className='text-xl md:text-5xl py-1 md:py-2 font-medium'>Best healthcare Solution <br /> in your City</p>
      <div className="mt-5 md:mt-10 font-bold">
      <button className="cursor-pointer text-xs md:text-lg bg-blue-200 rounded-md p-1 md:p-2 mx-1 md:mx-3 transition-all hover:bg-blue-400" onClick={scrollToStaff}>Find Doctors</button>
      <button onClick={handleAppointment} className="cursor-pointer text-xs md:text-lg bg-blue-200 rounded-md p-1 md:p-2 mx-1 md:mx-3 transition-all hover:bg-blue-400">Appointment</button>
      </div>
    </div> 
    </div>
    <About/>
    <Staff staffRef={staffRef}/>
    <DepartmentInfo/>
    <ServicesInfo/>
    <Message/>
    <Footer/>
    <Chatbot/>
    </div>     
    </>
  )
}

export default Home