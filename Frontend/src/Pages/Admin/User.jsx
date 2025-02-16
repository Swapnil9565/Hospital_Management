import axios from 'axios';
import React, { useEffect, useState } from 'react'

const User = () => {
    const [loading,setLoading]=useState(true);
    const [users,setUsers]=useState([]);
   
    useEffect(()=>{
        const fetchUsers=async()=>{
            try {
                const res=await axios.get("https://hospital-management-99yz.onrender.com/api/admin/fetchUsers",{
                    headers:{
                        "Content-Type":"application/json",
                    }
                })
                if(res.status===200){
                    setUsers(res.data.users);
                }
            } catch (error) {
                alert(error);
            }finally{
                setLoading(false);
            }
           
        }
        fetchUsers();
    },[])


  return (
    <div>
    <div className="h-[80vh] border-2 border-black m-5 rounded-md overflow-y-scroll">
      <h1 className="font-bold text-2xl text-green-900 uppercase m-5">
        All Users
      </h1>

      {loading ? (
        <p className="text-center text-lg text-blue-600">Fetching users...</p>
      ) : (
        <table className="w-full border-collapse mt-10">
          <thead>
            <tr className="px-8 text-center">
                <th>Sr No.</th>
              <th>User Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
             </tr>
          </thead>
          <tbody>
            {users?.length>0 ? (
              users.map((user, index) => (
                <tr key={index} className="text-center px-8 odd:bg-blue-200">
                  <td>{index+1}</td>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-red-500">
                  No Users found.
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

export default User