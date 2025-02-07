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
      const res=await axios.post("https://hospital-management-99yz.onrender.com/api/auth/login",loginData,{
        headers:{
          "Content-Type":"application/json"
        }
       })
  
       if(res.status===200){
         localStorage.setItem("token",res.data.token);
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
                      navigate("/");
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
    <ToastContainer className='w-[25vw]' />
    <FontAwesomeIcon icon={faArrowLeft} className='text-bold m-5 text-xl cursor-pointer' onClick={()=>navigate("/")}/>
    <h1 className='text-center text-blue-300 font-bold text-4xl pt-10'>MedZone</h1>
    <div className='flex h-[70vh] justify-center items-center'>
    <div className="w-full max-w-md bg-transparent rounded-lg shadow-2xl  p-6">
    <h2 className="text-2xl font-bold text-center">Log In</h2>
    <form className="mt-6 space-y-" onSubmit={handleLogin}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          value={loginData.email} onChange={handleChange} 
          placeholder="Enter your email"
          className="my-2 block w-full px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password"
          value={loginData.password} onChange={handleChange} 
          placeholder="Enter your password"
          className="my-2 block w-full px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        Log In
      </button>
      <p className='text-center my-2'>Don't have an account? <Link to="/register" className="text-blue-300 font-semibold">Sign Up Now </Link> </p>
      
    </form>
  </div>      
  </div>
  </div>
  )
}

export default Login