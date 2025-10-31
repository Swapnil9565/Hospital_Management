import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import PaginationComponent from '../../Components/Admin/PaginationComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditDoctorModal from '../../Components/Admin/EditDoctorModal';
import DeleteDoctorPopup from '../../Components/Admin/DeleteDoctorPopup';
import CheckDoctorsSkeleton from './Skeletons/CheckDoctorsSkeleton';
const CheckDoctors = () => {
    const [loading,setLoading]=useState(true);
    const [doctors,setDoctors]=useState([]);
    const [selectedDoctor,setSelectedDoctor]=useState(null);
    const [isOpenEditModal,setIsOpenEditModal]=useState(false);
    const [isOpenDeletePopup,setIsOpenDeletePopup]=useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
   
    useEffect(()=>{
        const fetchDoctors=async()=>{
            try {
                const res=await axios.get("http://localhost:3000/api/admin/fetchDoctors",{
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
    },[isOpenEditModal,isOpenDeletePopup])
   
    const lastRowIndex = currentPage * rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;
    const currentRows = doctors.slice(firstRowIndex, lastRowIndex);
    
    const handlePageChange=(e,page)=>{
      setCurrentPage(page);
  }
 
  const handleEdit=async(doctorId)=>{
    setSelectedDoctor(doctorId);
    setIsOpenEditModal(true);
 
  }
  const handleDelete=async(doctorId)=>{
    setSelectedDoctor(doctorId);
    setIsOpenDeletePopup(true);
  }
  return (
   
    <div className="h-screen md:h-[83vh] border-2 border-black m-2 md:m-5 rounded-md overflow-x-auto">
    <ToastContainer className='w-[90vw] md:w-[25vw]' />
    <div className="flex flex-wrap justify-between items-center m-2 md:m-5 gap-3">
      <h1 className="font-bold text-xl md:text-2xl text-green-900 uppercase">
        All Doctors
      </h1>
      <button className="py-2 px-3 text-sm md:text-base font-semibold tracking-wide bg-blue-900 text-white rounded-md">
        <Link to="/admin/addDoctors" className='flex items-center gap-2'>
          <FontAwesomeIcon icon={faPlus}/> Add New
        </Link>
      </button>
    </div>
    {loading ? (
      <CheckDoctorsSkeleton/>
    ) : (
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse mt-5 md:mt-10 border-separate border-spacing-y-3 text-sm md:text-base">
          <thead>
            <tr className="text-center">
              <th>Sr No.</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>City</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              currentRows.map((doctor, index) => (
                <tr key={index} className="text-center odd:bg-blue-200">
                  <td>{firstRowIndex + index + 1}</td>
                  <td>
                    <img src={doctor.photo} alt="" width={40} className='mx-auto'/>
                  </td>
                  <td>{doctor.docName}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.city}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.contact}</td>
                  <td className='flex items-center gap-3 justify-center pt-2'>
                    <FontAwesomeIcon icon={faEdit} color='green' className='cursor-pointer' onClick={() => handleEdit(doctor._id)}/>
                    <FontAwesomeIcon icon={faTrash} color='red' className='cursor-pointer' onClick={() => handleDelete(doctor._id)}/>
                  </td>
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
      </div>
    )}
    <PaginationComponent 
      totalItems={doctors.length} 
      currentPage={currentPage} 
      rowsPerPage={rowsPerPage} 
      onPageChange={handlePageChange} 
      className="relative mt-5"
    />
    <div className='absolute top-[60%] md:top-1/2 left-[65%] md:left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      {isOpenEditModal && <EditDoctorModal setIsOpenEditModal={setIsOpenEditModal} doctorId={selectedDoctor}/>}
    </div>
    <div className='absolute top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      {isOpenDeletePopup && <DeleteDoctorPopup setIsOpenDeletePopup={setIsOpenDeletePopup} doctorId={selectedDoctor}/>}
    </div>
  </div>
  

  )
}

export default CheckDoctors