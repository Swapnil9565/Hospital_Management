import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Setting = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "https://hospital-management-99yz.onrender.com/api/user/editProfile",
        { username: formData.username, password: formData.password }, // Prevent updating email
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 200) {
        const {username,password}=res.data.user;
        setFormData({...formData,username,password});
        toast.success(res.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      }
    } catch (error) {
       toast.error("Something went wrong while updating profile",{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
   
  };
  return (
    <div className='px-2 md:px-6 py-1'>
      <h1 className='text-lg md:text-2xl font-semibold my-4'>
        Profile Settings
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleProfileSubmit}>
        <div className='relative'>
          <input
            type='text'
            name='username'
            value={formData.username}
            placeholder='Full Name'
            className='w-full border-b-2 border-gray-400 focus:border-blue-500 outline-none text-sm md:text-lg py-2 px-1 transition-all'
            onChange={handleChange}
          />
        </div>
        <div className='relative'>
          <input
            type='email'
            name='email'
            value={formData.email}
            placeholder='Email'
            className='w-full border-b-2 border-gray-400 focus:border-blue-500 outline-none text-sm md:text-lg py-2 px-1 transition-all'
            onChange={handleChange}
          />
        </div>
        <div className='relative'>
          <input
            type='password'
            name='password'
            value={formData.password}
            placeholder='Password'
            className='w-full border-b-2 border-gray-400 focus:border-blue-500 outline-none text-sm md:text-lg py-2 px-1 transition-all'
            onChange={handleChange}
          />
        </div>
        <button className='mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-lg'>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Setting;
