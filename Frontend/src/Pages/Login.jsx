import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate=useNavigate();
  const [loginData,setloginData]=useState({
    email:"",
    password:""
  })

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setloginData({...loginData,[name]:value});
  }

  const handleLogin=async(e)=>{
     e.preventDefault();
     try {
      const res=await axios.post("https://hospital-management-pe6s.onrender.com/api/auth/login",loginData,{
        headers:{
          "Content-Type":"application/json"
        }
       })
  
       if(res.status===200){
         localStorage.setItem("token",res.data.token);
         localStorage.setItem("role",res.data.user.role);
         localStorage.setItem("user",JSON.stringify(res.data.user))
          toast.success(res.data.message, {
                       position: "top-center",
                       autoClose: 3000,
                       hideProgressBar: false,
                       closeOnClick: true,
                       pauseOnHover: true,
                       draggable: true,
                       progress: undefined,
                     });
                     setTimeout(() => {
                      if (res.data.user.role === "admin") {
                        navigate("/admin/dashboard"); 
                      } else {
                        navigate("/");
                      }
                    }, 2000);
       }
       
      
    } catch (error) {
        toast.error("Invalid email or password", {
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
    <div style={{ background: 'linear-gradient(155deg, rgba(2,0,36,1) 0%, rgb(2, 45, 66) 37%, rgba(0,212,255,1) 100%)' }} className='h-screen text-white'>
    <ToastContainer className='mt-10 ml-10 md:mt-2 md:ml-0 w-[60vw] md:w-[25vw]' />
    <FontAwesomeIcon icon={faArrowLeft} className='text-bold m-5 text-xl cursor-pointer' onClick={()=>navigate("/")}/>
    <h1 className='text-center text-blue-300 font-bold text-3xl md:text-4xl pt-5 md:pt-10'>MedZone</h1>
    <div className='flex h-[60vh] md:h-[70vh] justify-center items-center'>
    <div className="w-full max-w-md bg-transparent rounded-lg shadow-2xl p-4 md:p-6">
    <h2 className="text-xl md:text-2xl font-normal md:font-bold text-center">Log In</h2>
    <form className="mt-6 space-y-" onSubmit={handleLogin}>
      <div>
        <label htmlFor="email" className="block text-sm md:text-lg font-medium">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          value={loginData.email} onChange={handleChange} 
          placeholder="Enter your email"
          className="placeholder:text-sm md:placeholder:text-base my-2 bg-white block w-full px-2 py-1 md:px-4 md:py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-lg"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm md:text-lg font-medium">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password"
          value={loginData.password} onChange={handleChange} 
          placeholder="Enter your password"
          className="placeholder:text-sm md:placeholder:text-base my-2 bg-white block w-full px-2 py-1 md:px-4 md:py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-lg"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium cursor-pointer  px-2 py-2 md:px-4 text-sm md:text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        Log In
      </button>
      <p className='text-center text-sm md:text-lg my-2'>Don't have an account? <Link to="/register" className="text-blue-300 font-semibold text-sm md:text-lg ">Sign Up Now </Link> </p>
      
    </form>
  </div>      
  </div>
  </div>
  )
}

export default Login