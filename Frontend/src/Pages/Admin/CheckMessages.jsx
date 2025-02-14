import React, { useEffect, useState } from 'react'
import axios from 'axios';
const CheckMessages = () => {
  const [messages,setMessages]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const  fetchMessages=async()=>{
     try {
       const res=await axios.get("https://hospital-management-99yz.onrender.com/api/user/checkMessages",{
         headers:{
           "Content-Type":"application/json",
           "Authorization":localStorage.getItem("token")
         }
        })
        console.log(res.data);
        setMessages(res.data.messages);
     } catch (error) {
       console.error(error);
     }finally{
       setLoading(false);
     }
    }
       fetchMessages();
  },[])
  return (
    <div>
      <div className="h-[80vh] border-2 border-black m-5 rounded-md overflow-y-scroll">
        <h1 className="font-bold text-2xl text-green-900 uppercase m-5">
          All Messages
        </h1>

        {loading ? (
          <p className="text-center text-lg text-blue-600">Fetching messages...</p>
        ) : (
          <table className="w-full border-collapse mt-10">
            <thead>
              <tr className="px-8 text-center">
                <th>Serial No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.length>0 ? (
                messages.map((message, index) => (
                  <tr key={index} className="text-center px-8 odd:bg-blue-200">
                    <td>{index+1}</td>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.contact}</td>
                    <td className='word-break'>{message.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-red-500">
                    No Messages found.
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

export default CheckMessages