import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PaginationComponent from '../../Components/Admin/PaginationComponent';
const SeeAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "https://hospital-management-99yz.onrender.com/api/admin/fetchAppointments",
          {
            headers: {
              "Content-Type": "application/json",
              
            },
          }
        );
               setAppointments(res.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const currentRows = appointments.slice(firstRowIndex, lastRowIndex);
  
  const handlePageChange=(e,page)=>{
    setCurrentPage(page);
}

  return (
    <div>
      <div className="h-[83vh] border-2 border-black m-5 rounded-md">
        <h1 className="font-bold text-2xl text-green-900 uppercase m-5">
          All Patients
        </h1>

        {loading ? (
          <p className="text-center text-lg text-blue-600">Fetching Appointments...</p>
        ) : (
          <table className="w-full border-collapse mt-10 border-separate border-spacing-y-3">
            <thead>
              <tr className="px-8 text-center">
                <th>Patient ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Mobile</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.length>0 ? (
                currentRows.map((appointment, index) => (
                  <tr key={index} className="text-center px-8 odd:bg-blue-200">
                    <td>{firstRowIndex +index+1}</td>
                    <td>{appointment.fName}</td>
                    <td>{appointment.lName}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.mobile}</td>
                    <td>{appointment.department}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-red-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      <PaginationComponent totalItems={appointments.length} currentPage={currentPage} rowsPerPage={rowsPerPage} onPageChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default SeeAppointments;
