import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Register = () => {
  const navigate=useNavigate();
  const [registerData,setRegisterData]=useState({
    username:"",
    email:"",
    password:"",
    role:""
  })

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setRegisterData({...registerData,[name]:value});
  }
  const handleRegister=async(e)=>{
     e.preventDefault();
     try{

       const res=await axios.post("https://hospital-management-99yz.onrender.com/api/auth/register",registerData,{
        "Content-Type":"application/json",
       })
       if(res.status===200){
        setTimeout(() => {
          
          navigate("/login");
        }, 2000);
        return toast.success(res.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
       }
       if(res.status===404){
        return alert("Something went wrong")
       }
     }catch(error){
      toast.error("User Already exist with this email", {
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
      <h1 className='text-center text-blue-300 font-bold text-4xl pt-10'>
        MedZone
      </h1>
      <div className='flex h-[70vh] justify-center items-center'>
      <div className="w-full max-w-md bg-transparent rounded-lg shadow-2xl  p-6">
          <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
          <form className='mt-6 space-y-' onSubmit={handleRegister}>
            <div>
              <label htmlFor='username' className='block text-sm font-medium'>
                Name
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={registerData.username}
                onChange={handleChange}
                placeholder='Enter your name'
                className='text-black my-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={registerData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className='text-black my-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={registerData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className='text-black my-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>
            <div>
              <label htmlFor='role' className='block text-sm font-medium'>
                Register As
              </label>
            <div className="flex my-2">
              <label className='flex items-center mx-1'>
                <input type='radio' name='role' value="user" onChange={handleChange} className='mr-2' />
                User
              </label>

              <label className='flex items-center mx-1'>
                <input
                  type='radio'
                  name='role'
                  value="admin"
                   onChange={handleChange}
                  className='mr-2'
                />
                Admin
              </label>
         </div>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
              Sign Up
            </button>
            <p className='text-center my-2'>
              Already have an account?{" "}
              <Link to='/login' className='text-blue-300 font-semibold'>
                Login Now
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
