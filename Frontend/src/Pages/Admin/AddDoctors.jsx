import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
export default function AddDoctor() {
  const [formData, setFormData] = useState({
    photo: null,
    docName: "",
    specialization: "",
    city: "",
    gender: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("photo", formData.photo);
    data.append("docName", formData.docName);
    data.append("specialization", formData.specialization);
    data.append("city", formData.city);
    data.append("gender", formData.gender);
    data.append("contact", formData.contact);
    try {
      const res = await axios.post(
        "https://hospital-management-pe6s.onrender.com/api/admin/addDoctor",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          photo: null,
          docName: "",
          specialization: "",
          city: "",
          gender: "",
          contact: "",
        });
      }
    } catch (error) {
      toast.error("Something went wrong while adding doctors", {
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
    <div className='h-screen pt-2 md:pt-5 bg-slate-800 flex justify-center md:items-center px-4'>
    <ToastContainer className='w-[60vw] md:w-[40vw]' />
    <div className='w-full max-w-lg mx-auto p-2 md:p-5 bg-[#E0E0E0] rounded-2xl shadow-lg'>
      <h2 className='text-xl sm:text-2xl font-semibold text-center mb-4 text-blue-900'>
        Add a New Doctor
      </h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data' className='space-y-4'>
        <div>
          <label className='block text-sm md:text-lg'>Upload Photo</label>
          <input
            type='file'
            name='photo'
            accept='image/*'
            onChange={handleFileChange}
            className='mt-1 w-full border rounded-lg p-1 md:p-2'
          />
        </div>
        <div>
          <label className='block text-sm md:text-lg'>Doctor Name</label>
          <input
            type='text'
            name='docName'
            value={formData.docName}
            onChange={handleChange}
            className='mt-1 w-full border rounded-lg p-1 md:p-2'
            required
          />
        </div>
        <div>
          <label className='block text-sm md:text-lg'>Specialization</label>
          <input
            type='text'
            name='specialization'
            value={formData.specialization}
            onChange={handleChange}
            className='mt-1 w-full border rounded-lg p-1 md:p-2'
            required
          />
        </div>
        <div>
          <label className='block text-sm md:text-lg'>City</label>
          <input
            type='text'
            name='city'
            value={formData.city}
            onChange={handleChange}
            className='mt-1 w-full border rounded-lg p-1 md:p-2'
            required
          />
        </div>
        <div>
          <label className='block text-sm md:text-lg'>Gender</label>
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            className='mt-1 w-full border rounded-lg p-1 md:p-2'
            required>
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div>
          <label className='block text-sm md:text-lg'>Contact Number</label>
          <input
            type='tel'
            name='contact'
            value={formData.contact}
            onChange={handleChange}
            className='mt-1 w-full border rounded-lg p-1 md:p-2'
            required
          />
        </div>
        <button type='submit' className='w-full bg-[#053A6F] text-sm md:text-lg text-white p-1 md:p-2 rounded-lg hover:bg-[#032A50] transition'>
          Add Doctor
        </button>
      </form>
    </div>
  </div>
  
  );
}
