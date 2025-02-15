import React, { useState } from "react";
import axios from "axios";
export default function AddDoctor() {
  
    const [formData, setFormData] = useState({
      photo: null,
      docName: "",
      specialization: "",
      city: "",
      gender: "",
      contact:""
    })

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
    data.append("docName", formData.name);
    data.append("specialization", formData.specialization);
    data.append("city", formData.city);
    data.append("gender", formData.gender);
    data.append("contactNo", formData.contact);
    try {
      const res = await axios.post(
        "https://hospital-management-99yz.onrender.com/api/admin/addDoctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      className='h-[90vh] pt-5'
      style={{
        background:
          "radial-gradient(circle, rgba(63,94,251,1) 0%, rgb(14, 222, 249) 100%)",
      }}>
      <div className='max-w-lg mx-auto p-3 bg-white rounded-2xl shadow-lg'>
        <h2 className='text-2xl font-semibold text-center mb-4'>
          Add a New Doctor
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block font-medium'>Upload Photo</label>
            <input
              type='file'
              name="photo"
              accept='image/*'
              onChange={handleFileChange}
              className='mt-1 w-full border rounded-lg p-1'
            />
          </div>
          <div>
            <label className='block font-medium'>Doctor Name</label>
            <input
              type='text'
              name='docName'
              value={formData.docName}
              onChange={handleChange}
              className='mt-1 w-full border rounded-lg p-1'
              required
            />
          </div>
          <div>
            <label className='block font-medium'>Specialization</label>
            <input
              type='text'
              name='specialization'
              value={formData.specialization}
              onChange={handleChange}
              className='mt-1 w-full border rounded-lg p-1'
              required
            />
          </div>
          <div>
            <label className='block font-medium'>City</label>
            <input
              type='text'
              name='city'
              value={formData.city}
              onChange={handleChange}
              className='mt-1 w-full border rounded-lg p-1'
              required
            />
          </div>
          <div>
            <label className='block font-medium'>Gender</label>
            <select
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              className='mt-1 w-full border rounded-lg p-1'
              required>
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div>
            <label className='block font-medium'>Contact Number</label>
            <input
              type='tel'
              name='contact'
              value={formData.contact}
              onChange={handleChange}
              className='mt-1 w-full border rounded-lg p-1'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600'>
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
