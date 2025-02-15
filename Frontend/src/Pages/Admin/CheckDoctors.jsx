import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CheckDoctors = () => {
    const [loading,setLoading]=useState(true);
    const [doctors,setDoctors]=useState([]);
   
    useEffect(()=>{
        const fetchDoctors=async()=>{
            try {
                const res=await axios.get("https://hospital-management-99yz.onrender.com/api/admin/fetchDoctors",{
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                if(res.status===200){
                    setDoctors(res.data.doctors);
                }
            } catch (error) {
                alert(error);
            }finally{
                setLoading(false);
            }
           
        }
        fetchDoctors();
    },[])


  return (
    <div>
    <div className="h-[80vh] border-2 border-black m-5 rounded-md overflow-y-scroll">
      <h1 className="font-bold text-2xl text-green-900 uppercase m-5">
        All Doctors
      </h1>

      {loading ? (
        <p className="text-center text-lg text-blue-600">Loading...</p>
      ) : (
        <table className="w-full border-collapse mt-10">
          <thead>
            <tr className="px-8 text-center">
              <th>Serial No.</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>City</th>
              <th>Gender</th>
              <th>Contact</th>
             </tr>
          </thead>
          <tbody>
            {doctors.length>0 ? (
              doctors.map((doctor, index) => (
                <tr key={index} className="text-center px-8 odd:bg-blue-200">
                  <td>{index+1}</td>
                  <td><img src={doctor.photo} alt="" width={50}/></td>
                  <td>{doctor.docName}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.city}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-red-500">
                  No Doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  </div>
  )
}

export default CheckDoctors