import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeeAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "https://hospital-management-99yz.onrender.com/api/user/checkAppointments",
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token"),
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

  return (
    <div>
      <div className="h-[80vh] border-2 border-black m-5 rounded-md overflow-y-scroll">
        <h1 className="font-bold text-2xl text-green-900 uppercase m-5">
          All Patients
        </h1>

        {loading ? (
          <p className="text-center text-lg text-blue-600">Loading...</p>
        ) : (
          <table className="w-full border-collapse mt-10">
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
              {appointments>0 ? (
                appointments.map((appointment, index) => (
                  <tr key={index} className="text-center px-8 odd:bg-blue-200">
                    <td>{index+1}</td>
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
      </div>
    </div>
  );
};

export default SeeAppointments;
