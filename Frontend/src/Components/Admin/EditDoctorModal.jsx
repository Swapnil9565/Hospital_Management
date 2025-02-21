import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
export default function EditDoctorModal({setIsOpenEditModal}) {
  const [formData, setFormData] = useState({
    photo: null,
    docName: "",
    specialization: "",
    city: "",
    gender: "",
    contact: "",
  });

  const fetchDoctorData=async()=>{
const res=await axios.get("https://hospital-management-99yz.onrender.com/api/admin/fetchDoctorById",{
     headers:{
        "Content-Type":"application/json",
        "Authorization":localStorage.getItem("token")
     }
     })
     console.log(res.data);
     if(res.status===200){
       const {docName,specialization,city,gender,contact}=res.data.doctorData;
      setFormData({docName,specialization,city,gender,contact});
     }
  }
  fetchDoctorData();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://hospital-management-99yz.onrender.com/api/admin/editDoctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
                "Authorization":localStorage.getItem("token")
          },
        }
      );
      if (res.status === 200) {
        alert(res.data.message);
        // toast.success(res.data.message, {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
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
        alert(error);
    //   toast.error("Something went wrong while adding doctors", {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    }
  };

  return (
 
      <div className='max-w-lg mx-auto p-3 bg-white rounded-2xl shadow-lg'>
        <div className="flex items-center justify-between mb-4">
        <h2 className='text-2xl font-semibold text-center'>
          Edit a Doctor
        </h2>
        <FontAwesomeIcon icon={faMultiply} size="xl" color="red" className="cursor-pointer" onClick={()=>setIsOpenEditModal(false)}/>
        </div>
        <form
          onSubmit={handleEditSubmit}
          encType='multipart/form-data'
          className='space-y-4'>
          <div>
            <label className='block font-medium'>Upload Photo</label>
            <input
              type='file'
              name='photo'
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
            Edit Doctor
          </button>
        </form>
      </div>
  
  );
}
