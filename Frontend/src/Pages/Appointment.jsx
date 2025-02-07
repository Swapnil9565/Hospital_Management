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
    <div className='h-screen' style={{background:`url(${appintmentBg})`, backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
      <ToastContainer className='w-[25vw]' />
      <button
        onClick={() => navigate("/")}
        className='py-2 px-1 text-md font-medium bg-blue-300 rounded-md float-right m-3 hover:bg-blue-400'>
        <FontAwesomeIcon icon={faArrowLeft} className='mx-3' />
        Back to HomePage
      </button>
      <div className='mx-auto w-3/4 h-[80vh] flex items-center justify-center'>
        <div>
          <img
            src={appointmentImg}
            alt=''
            width={400}
            className='aspect-square rounded-lg'
          />
        </div>
        <div className='py-4 px-2'>
          <form onSubmit={handleSubmit}>
            <h1 className='text-center text-black font-bold uppercase text-xl'>
              Book An Appointment
            </h1>
            <input
              type='text'
              name='fName'
              className='py-2 px-1 border-2 border-gray rounded-md mr-4 outline-blue-400'
              placeholder='First Name'
              value={patientInfo.fName}
              onChange={handleChange}
            />

            <input
              type='text'
              name='lName'
              className='py-2 px-1 border-2 border-gray rounded-md my-4 outline-blue-400'
              placeholder='Last Name'
              value={patientInfo.lName}
              onChange={handleChange}
            />
            <br />
            <input
              type='email'
              name='email'
              className='w-full py-2 px-1 border-2 border-gray rounded-md  outline-blue-400'
              placeholder='Email Address'
              value={patientInfo.email}
              required
              onChange={handleChange}
            />
            <br />
            <input
              type='tel'
              name='mobile'
              className='w-full py-2 px-1 border-2 border-gray rounded-md my-3 outline-blue-400 '
              value={patientInfo.mobile}
              placeholder='Mobile number'
              onChange={handleChange}
              required
            />
            <br />
            <div className='py-3 flex items-center justify-between '>
              <label htmlFor='Gender' className='text-slate-600 font-bold text-lg'>
                Gender:
              </label>
              <div className='rounded-md px-5 py-2  flex justify-center bg-white items-center gap-5 mx-5'>
                <div>
                <label htmlFor='Male'>Male</label>
                </div>
                <div>
                  <input type='radio' name='gender' id='Male' value="Male" onChange={handleChange} />
                </div>
              </div>
              <div className='rounded-md px-5 py-2 flex justify-between bg-white items-center gap-5 mx-5'>
                <div>
                  <label htmlFor='Female'>Female</label>
                </div>
                <div>
                  <input type='radio' name='gender' id='Female' value="Female" onChange={handleChange}/>
                </div>
              </div>
            </div>
            <select
              className='py-2 px-1 border-2 border-gray rounded-md outline-blue-400 w-48'
              value={patientInfo.department}
              name='department'
              onChange={handleChange}>
              <option value='Select Department'>Select Department</option>
              <option value='Cardiology'>Cardiology</option>
              <option value='Orthopedic'>Orthopedic</option>
              <option value='Gynacology'>Gynacology</option>
              <option value='Dermatology'>Dermatology</option>
              <option value='Pediatrics'>Pediatrics</option>
              <option value='Neurology'>Neurology</option>
            </select>
            <br />
            <label htmlFor='Date' className='text-slate-600 font-bold'>
              Confirm Date: <br />
              <input
                type='date'
                name='date'
                id='Date'
                min={new Date().toISOString().split("T")[0]}
                value={patientInfo.date}
                onChange={handleChange}
                onFocus={(e) => e.target.showPicker()}
                className='text-black font-normal py-2 mr-4 px-1 border-2 border-gray rounded-md  outline-blue-400 '
              />
            </label>
            <br />
            <label htmlFor='Time' className='text-slate-600 font-bold'>
              Confirm Time: <br />
              <input
                type='time'
                name='time'
                id='Time'
                value={patientInfo.time}
                onChange={handleChange}
                onFocus={(e) => e.target.showPicker()}
                className='text-black font-normal py-2 px-1 border-2 border-gray rounded-md mb-4 outline-blue-400 '
              />
            </label>
            <br />
            <input
              type='submit'
              value='Appointment Now'
              className='cursor-pointer w-full bg-green-300 rounded-sm py-2 text-center font-bold outline-blue-400'
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
