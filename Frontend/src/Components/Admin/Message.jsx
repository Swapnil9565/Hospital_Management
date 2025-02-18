import React, { useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
const Message = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hospital-management-99yz.onrender.com/api/user/message",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          name:"",
          email:"",
          contact:"",
          message:""
        })
      }

    } catch (error) {
      if (error.response.status === 400) {
        
        return toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if(error.response.status===401){
        return toast.error("Access denied..!Please Log in to continue", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      console.log(error);
    }
  };
  return (
    <div className='bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen flex flex-col justify-center items-center p-4'>
    <ToastContainer className='mt-6 w-[90vw] sm:w-[70vw] md:w-[50vw]' />
    <div className='bg-white rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center'>
      <h1 className='text-gray-800 font-bold text-xl sm:text-2xl mt-4'>
        Drop Us a Message
      </h1>
      <form
        onSubmit={handleSubmitMessage}
        className='mt-6 flex flex-col gap-4'>
        <input
          type='text'
          name='name'
          value={formData.name}
          placeholder='Full Name'
          onChange={handleChange}
          className='w-full p-3 border border-gray-300 rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          placeholder='Email'
          onChange={handleChange}
          className='w-full p-3 border border-gray-300 rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <input
          type='text'
          name='contact'
          value={formData.contact}
          placeholder='Contact No'
          onChange={handleChange}
          className='w-full p-3 border border-gray-300 rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <textarea
          name='message'
          rows='5'
          value={formData.message}
          placeholder='Leave your feedback...'
          onChange={handleChange}
          className='w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500'
        ></textarea>
        <button className='bg-purple-600 text-white w-full py-2 md:py-3 rounded-full font-semibold text-md md:text-lg hover:bg-purple-700 transition duration-300'>
          Send Message
        </button>
      </form>
    </div>
  </div>
  );
};

export default Message;
