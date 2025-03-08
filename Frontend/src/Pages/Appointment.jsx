import React, { useEffect, useState } from "react";
import axios from "axios";
import appointmentImg from "../Assets/appointment.jpeg";
import appintmentBg from "../Assets/appointment-bg.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Appointment() {
    const navigate=useNavigate();
  const [patientInfo, setPatienInfo] = useState({
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    gender:"",
    department: "",
    date: "",
    time: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatienInfo({...patientInfo,[name]:value});
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const res=await axios.post("https://hospital-management-99yz.onrender.com/api/user/appointment",patientInfo,{
      headers:{
        "Content-Type":"application/json",
        "Authorization":localStorage.getItem("token")
      }
    })
    toast.success(res.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setPatienInfo({
      fName: "",
      lName: "",
      email: "",
      mobile: "",
      department: "",
      gender:"",
      date: "",
      time: ""
    });
  };

  return (
    <div className='h-[200vh] md:h-screen bg-[#EBF3FF]'>
      <ToastContainer className='w-[80vw] mt-10 md:w-[25vw]' />
      <button
        onClick={() => navigate("/")}
        className='cursor-pointer py-1 px-2 md:py-2 md:px-4 text-sm md:text-md font-medium bg-blue-300 rounded-md float-right m-3 hover:bg-blue-400'>
        <FontAwesomeIcon icon={faArrowLeft} className='mx-2 md:mx-3' />
        Back to HomePage
      </button>
      <div className='mx-0 px-5 md:px-0 md:mx-4 md:mx-auto w-full md:w-3/4 h-auto md:h-screen flex flex-col md:flex-row items-center justify-center gap-6'>
        <div className='w-full md:w-1/2 flex justify-center'>
          <img
            src={appointmentImg}
            alt='Appointment'
            className='w-full max-w-xs md:max-w-sm aspect-square rounded-lg'
          />
        </div>
        <div className='w-full md:w-1/2 px-1 py-2 md:py-4 md:px-2'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <h1 className='text-center text-black font-bold uppercase text-lg md:text-xl mb-4'>
              Book An Appointment
            </h1>
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='text'
                name='fName'
                className='flex-1 p-2 border-2 bg-white border-gray-300 rounded-md outline-blue-400'
                placeholder='First Name'
                value={patientInfo.fName}
                onChange={handleChange}
                required
              />
              <input
                type='text'
                name='lName'
                className='flex-1 p-2 border-2 bg-white border-gray-300 rounded-md outline-blue-400'
                placeholder='Last Name'
                value={patientInfo.lName}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type='email'
              name='email'
              className='w-full p-2 border-2 bg-white border-gray-300 rounded-md outline-blue-400'
              placeholder='Email Address'
              value={patientInfo.email}
              onChange={handleChange}
              required
            />
            <input
              type='tel'
              name='mobile'
              className='w-full p-2 border-2 bg-white border-gray-300 rounded-md outline-blue-400'
              placeholder='Mobile Number'
              value={patientInfo.mobile}
              onChange={handleChange}
              required
            />
            <div className='flex flex-col md:flex-row gap-4 md:items-center'>
              <label className='text-slate-600 font-bold text-lg'>Gender:</label>
              <div className='flex gap-4'>
                <label className='flex items-center gap-2'>
                  <input type='radio' name='gender' value='Male' onChange={handleChange} required />
                  Male
                </label>
                <label className='flex items-center gap-2'>
                  <input type='radio' name='gender' value='Female' onChange={handleChange} required />
                  Female
                </label>
              </div>
            </div>
            <select
              className='w-full p-2 border-2 bg-white border-gray-300 rounded-md outline-blue-400'
              value={patientInfo.department}
              name='department'
              onChange={handleChange}
              required
            >
              <option value=''>Select Department</option>
              <option value='Cardiology'>Cardiology</option>
              <option value='Orthopedic'>Orthopedic</option>
              <option value='Gynecology'>Gynecology</option>
              <option value='Dermatology'>Dermatology</option>
              <option value='Pediatrics'>Pediatrics</option>
              <option value='Neurology'>Neurology</option>
            </select>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1'>
                <label className='text-slate-600 font-bold'>Confirm Date:</label>
                <input
                  type='date'
                  name='date'
                  min={new Date().toISOString().split("T")[0]}
                  value={patientInfo.date}
                  onChange={handleChange}
                  className='w-full p-2 border-2 bg-white border-gray-300 rounded-md outline-blue-400'
                  required
                />
              </div>
              <div className='flex-1'>
                <label className='text-slate-600 font-bold'>Confirm Time:</label>
                <input
                  type='time'
                  name='time'
                  value={patientInfo.time}
                  onChange={handleChange}
                  className='w-full p-2 border-2 bg-white border-gray-300 rounded-md outline-blue-400'
                  min="09:00"
                  max="21:00"
                  required
                />
              </div>
            </div>
            <button
              type='submit'
              className='cursor-pointer w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3 rounded-md'>
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Appointment;
