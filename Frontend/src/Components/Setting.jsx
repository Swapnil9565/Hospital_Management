import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Setting = () => {
  const [showPassword,setShowPassword]=useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        "https://hospital-management-99yz.onrender.com/api/user/fetchUserInfo",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        const {username,email}=res.data.userInfo;
        setFormData({
          username,
          email,
          password:""
        })
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        "https://hospital-management-99yz.onrender.com/api/user/updateProfile",
        { username: formData.username, password: formData.password },
        { headers:
           { 
            "Content-Type": "application/json",
             "Authorization":localStorage.getItem("token")
            } 
        }
      );
      if (res.status === 200) {
        const { username,password } = res.data.user;
        setFormData({ ...formData, username, password });
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        localStorage.setItem("user", JSON.stringify({ ...storedUser, username }));
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
      
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message || "Invalid input", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(error.response.data.message || "Something went wrong", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        toast.error("Network error. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    
    }
  };
  return (
    <div>
          <ToastContainer className='mt-10 ml-10 md:mt-2 md:ml-0 w-[60vw] md:w-[25vw]' />
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
            className='text-gray-400 w-full border-b-2 border-gray-400 focus:border-blue-500 outline-none text-sm md:text-lg py-2 px-1 transition-all'
            onChange={handleChange}
            disabled
          />
        </div>
        <div className='relative'>
          <input
            type={showPassword?"password":"text"}
            name='password'
            value={formData.password}
            placeholder='New Password'
            className='w-full border-b-2 border-gray-400 focus:border-blue-500 outline-none text-sm md:text-lg py-2 px-1 transition-all'
            onChange={handleChange}
          />
          <FontAwesomeIcon icon={showPassword? faEye:faEyeSlash} onClick={()=>setShowPassword(!showPassword)} className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"/>
        </div>
        <button className='mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-lg'>
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
};

export default Setting;
