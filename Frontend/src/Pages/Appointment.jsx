import React, { useEffect, useState } from "react";
import axios from "axios";
import appointmentImg from "../Assets/appointment.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function Appointment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patientInfo, setPatienInfo] = useState({
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    gender: "",
    department: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const errorClass = "text-red-500 text-sm min-h-[20px]";
  // Form validation
  const validate = () => {
    let newErrors = {};

    if (!patientInfo.fName.trim()) {
      newErrors.fName = "First name is required";
    } else if (!/^[A-Za-z]{2,}$/.test(patientInfo.fName)) {
      newErrors.fName = "First name must contain only letters";
    }

    if (!patientInfo.lName.trim()) {
      newErrors.lName = "Last name is required";
    } else if (!/^[A-Za-z]{2,}$/.test(patientInfo.lName)) {
      newErrors.lName = "Last name must contain only letters";
    }

    if (!patientInfo.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(patientInfo.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!patientInfo.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(patientInfo.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!patientInfo.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!patientInfo.department) {
      newErrors.department = "Please select department";
    }

    if (!patientInfo.date) {
      newErrors.date = "Please select appointment date";
    }

    if (!patientInfo.time) {
      newErrors.time = "Please select appointment time";
    } else {
      const [hour, minute] = patientInfo.time.split(":").map(Number);
      const timeInMinutes = hour * 60 + minute;

      const start = 10 * 60; // 10:00 AM
      const end = 20 * 60; // 8:00 PM

      if (timeInMinutes < start || timeInMinutes > end) {
        newErrors.time = "Time must be between 10:00 AM and 8:00 PM";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchAppointmentData = async () => {
      if (id) {
        try {
          const res = await axios.get(
            `https://hospital-management-pe6s.onrender.com/api/user/appointment/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.status === 200) {
            setPatienInfo(res.data.appointmentData);
          }
        } catch (error) {
          toast.error("Failed to load appointment detail");
        }
      }
    };
    fetchAppointmentData();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatienInfo({ ...patientInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    let res;
    if (id) {
      //updating existing appointment
      res = await axios.put(
        `https://hospital-management-pe6s.onrender.com/api/user/updateAppointment/${id}`,
        patientInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setTimeout(() => {
        navigate("/userDashboard");
      }, 1000);
    } else {
      //Creating new appointment
      res = await axios.post(
        "https://hospital-management-pe6s.onrender.com/api/user/appointment",
        patientInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    }

    toast.success(res.data.message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    if (!id) {
      setPatienInfo({
        fName: "",
        lName: "",
        email: "",
        mobile: "",
        department: "",
        gender: "",
        date: "",
        time: "",
      });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f0f7ff] via-[#e0e7ff] to-[#f0f7ff] py-1 px-4 md:px-8'>
      <ToastContainer className='w-[80vw] mt-4 md:w-[25vw]' />

      <div className='clear-both max-w-6xl mx-auto mt-6 bg-white/70 backdrop-blur-lg rounded-[2rem] shadow-2xl shadow-blue-200/50 overflow-hidden border border-white/50 flex flex-col md:flex-row items-stretch'>
        <div className='w-full md:w-5/12 bg-blue-600 p-6 flex flex-col justify-center items-center text-white relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full -mr-16 -mt-16 opacity-50'></div>
          <div className='absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full -ml-12 -mb-12 opacity-50'></div>

          <img
            src={appointmentImg}
            alt='Appointment'
            className='relative z-10 w-full max-w-xs drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 rounded-2xl'
          />
          <div className='relative z-10 mt-8 text-center'>
            <h2 className='text-2xl font-bold mb-2'>Quality Care</h2>
            <p className='text-blue-100 text-sm'>
              Your health is our top priority. Schedule your visit with our
              expert consultants today.
            </p>
          </div>
        </div>
        <div className='w-full md:w-7/12 p-4 md:p-8 flex flex-col justify-center bg-white h-full'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='mb-4'>
              <h1 className='text-3xl font-extrabold text-[#1e293b] tracking-tight'>
                {id ? "Reschedule Visit" : "Book Appointment"}
              </h1>
              <p className='text-slate-500 mt-1'>
                Please fill in the details below to confirm your slot.
              </p>
              <div className='h-1.5 w-14 bg-blue-600 mt-2 rounded-full'></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7'>
              <div className='relative flex flex-col'>
                <label className='text-sm font-bold text-slate-700 mb-1 ml-1'>
                  First Name
                </label>
                <input
                  type='text'
                  name='fName'
                  placeholder='Enter Your First Name'
                  value={patientInfo.fName}
                  onChange={handleChange}
                  className='w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300'
                />
                <p className='absolute -bottom-5 left-1 text-red-500 text-[14px] font-medium leading-none whitespace-nowrap'>
                  {errors.fName}
                </p>
              </div>

              <div className='relative flex flex-col'>
                <label className='text-sm font-bold text-slate-700 mb-1 ml-1'>
                  Last Name
                </label>
                <input
                  type='text'
                  name='lName'
                  placeholder='Enter Your Last Name'
                  value={patientInfo.lName}
                  onChange={handleChange}
                  className='w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300'
                />
                <p className='absolute -bottom-5 left-1 text-red-500 text-[14px] font-medium leading-none whitespace-nowrap'>
                  {errors.lName}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7'>
              <div className='relative flex flex-col'>
                <label className='text-sm font-bold text-slate-700 mb-1 ml-1'>
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='john@example.com'
                  value={patientInfo.email}
                  onChange={handleChange}
                  className='w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-300'
                />
                <p className='absolute -bottom-5 left-1 text-red-500 text-[14px] font-medium leading-none whitespace-nowrap'>
                  {errors.email}
                </p>
              </div>

              <div className='relative flex flex-col'>
                <label className='text-sm font-bold text-slate-700 mb-1 ml-1'>
                  Phone Number
                </label>
                <input
                  type='tel'
                  name='mobile'
                  placeholder='Contact Number'
                  value={patientInfo.mobile}
                  onChange={handleChange}
                  className='w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-300'
                />
                <p className='absolute -bottom-5 left-1 text-red-500 text-[14px] font-medium leading-none whitespace-nowrap'>
                  {errors.mobile}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7 items-end'>
              <div className='relative p-3 bg-[#f8fafc] rounded-xl border border-slate-100 flex flex-col'>
                <label className='text-[11px] font-black text-slate-700 uppercase tracking-widest mb-2'>
                  Gender
                </label>
                <div className='flex gap-6 h-8 items-center'>
                  <label className='flex items-center gap-2 cursor-pointer group'>
                    <input
                      type='radio'
                      name='gender'
                      value='Male'
                      checked={patientInfo.gender === "Male"}
                      onChange={handleChange}
                      className='w-4 h-4 accent-blue-600'
                    />
                    <span className='text-sm font-medium text-slate-600'>
                      Male
                    </span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer group'>
                    <input
                      type='radio'
                      name='gender'
                      value='Female'
                      checked={patientInfo.gender === "Female"}
                      onChange={handleChange}
                      className='w-4 h-4 accent-blue-600'
                    />
                    <span className='text-sm font-medium text-slate-600'>
                      Female
                    </span>
                  </label>
                </div>
                <p className='absolute -bottom-5 left-1 text-red-500 text-[14px] font-medium leading-none whitespace-nowrap'>
                  {errors.gender}
                </p>
              </div>

              <div className='relative flex flex-col'>
                <label className='text-sm font-bold text-slate-700 mb-1 ml-1'>
                  Department
                </label>
                <select
                  name='department'
                  value={patientInfo.department}
                  onChange={handleChange}
                  className='w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm appearance-none'>
                  <option value=''>Select Department</option>
                  <option value='Cardiology'>Cardiology</option>
                  <option value='Neurology'>Neurology</option>
                  <option value='Dermatology'>Dermatology</option>
                  <option value='Orthology'>Orthology</option>
                  <option value='Paediatrics'>Paediatrics</option>
                  <option value='Physiology'>Physiology</option>
                </select>
                <p className='absolute -bottom-5 left-1 text-red-500 text-[14px] font-medium leading-none whitespace-nowrap'>
                  {errors.department}
                </p>
              </div>
            </div>

            {/* Row 4: Date & Time */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7'>
              <div className='relative flex flex-col'>
                <label className='text-sm font-bold text-slate-700 mb-1 ml-1'>
                  Date
                </label>
                <input
                  type='date'
                  name='date'
                  value={patientInfo.date}
                  onChange={handleChange}
                  className='w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none'
                />
                <p className='absolute -bottom-5 left-1 text-red-500 text-[14px] font-medium leading-none whitespace-nowrap'>
                  {errors.date}
                </p>
              </div>

              <div className='relative flex flex-col'>
                <label className='text-sm font-bold text-slate-700 mb-1 ml-1'>
                  Time
                </label>
                <input
                  type='time'
                  name='time'
                  value={patientInfo.time}
                  onChange={handleChange}
                  className='w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none'
                />
                <p className='absolute -bottom-5 left-1 text-red-500 text-[14px] font-medium leading-none whitespace-nowrap'>
                  {errors.time}
                </p>
              </div>
            </div>

            <div className='pt-6'>
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]'>
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
