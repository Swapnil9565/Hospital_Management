import React, { useEffect,useState } from 'react'

const PatientAppointments = () => {
  const [patientData, setPatientData] = useState([])
  const getPatientDataFromLocal=()=>{
    const data=JSON.parse(localStorage.getItem("Patient"));
    if(data){

      setPatientData(data);
    }
   
  }
  useEffect(()=>{
      getPatientDataFromLocal();
  },[])
  console.log(patientData);
  return (
    <div className='h-[90vh]  border-2 border-black m-5 rounded-md'>
      <h1 className='font-bold text-2xl text-green-900 uppercase m-5'>All Patients</h1>
      <table className='w-full border-collapse mt-10'>
                <thead>
                    <tr className='px-8 text-center'>
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
                    {patientData && patientData.map((appointment,index) => (
                        <tr key={index} className='text-center px-8 odd:bg-blue-200'>
                            <td>{index+1}</td>
                            <td>{appointment.fName}</td>
                            <td>{appointment.lName}</td>
                            <td>{(appointment.gender).toUpperCase()}</td>
                            <td>{appointment.mobile}</td>
                            <td>{appointment.department}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default PatientAppointments