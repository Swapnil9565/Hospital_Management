import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PaginationComponent from '../../Components/Admin/PaginationComponent';
const CheckDoctors = () => {
    const [loading,setLoading]=useState(true);
    const [doctors,setDoctors]=useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
   
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
   
    const lastRowIndex = currentPage * rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;
    const currentRows = doctors.slice(firstRowIndex, lastRowIndex);
    
    const handlePageChange=(e,page)=>{
      setCurrentPage(page);
  }

  return (
    <div>
    <div className="h-[83vh] border-2 border-black m-5 rounded-md">
      <h1 className="font-bold text-2xl text-green-900 uppercase m-5">
        All Doctors
      </h1>

      {loading ? (
        <p className="text-center text-lg text-blue-600">Fetching Doctors...</p>
      ) : (
        <table className="w-full border-collapse mt-10 border-separate border-spacing-y-3">
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
              currentRows.map((doctor, index) => (
                <tr key={index} className="text-center px-8 odd:bg-blue-200">
                  <td>{firstRowIndex + index+1}</td>
                  <td><img src={doctor.photo} alt="" width={50} className='mx-auto'/></td>
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
     <PaginationComponent totalItems={doctors.length} currentPage={currentPage} rowsPerPage={rowsPerPage} onPageChange={handlePageChange}/>
     </div>
  </div>
  )
}

export default CheckDoctors