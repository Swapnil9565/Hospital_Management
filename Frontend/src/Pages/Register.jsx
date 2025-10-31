import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [secretKey, setSecretKey] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  const handleRegister = async (e) => {
    if (registerData.role == "admin" && secretKey != "swapnil@9565") {
      e.preventDefault();
      toast.error("Access denied! Incorrect secret key entered", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      e.preventDefault();
      try {
        const res = await axios.post(
          "https://hospital-management-pe6s.onrender.com/api/auth/register",
          registerData,
          {
            "Content-Type": "application/json",
          }
        );
        if (res.status === 200) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return toast.success(res.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (res.status === 404) {
          return alert("Something went wrong");
        }
      } catch (error) {
        toast.error("User already exist with this email", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

  
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(155deg, rgba(2,0,36,1) 0%, rgb(2, 45, 66) 37%, rgba(0,212,255,1) 100%)",
      }}
      className='h-screen text-white'>
      <ToastContainer className='mt-10 ml-10 md:mt-2 md:ml-0 w-[60vw] md:w-[25vw]' />
      <FontAwesomeIcon
        icon={faArrowLeft}
        className='text-bold m-5 text-md md:text-xl cursor-pointer'
        onClick={() => navigate("/")}
      />
      <h1 className='text-center text-blue-300 font-bold text-3xl md:text-4xl pt-5 md:pt-10'>
        MedZone
      </h1>
      <div className='flex h-[70vh] justify-center items-center'>
        <div className='w-full max-w-md bg-transparent rounded-lg shadow-2xl p-3 md:p-6'>
          <h2 className='text-xl md:text-2xl font-normal md:font-bold text-center'>Sign Up</h2>
          <form className='mt-6 space-y-' onSubmit={handleRegister}>
          <div>
              <label htmlFor='role' className='block text-sm md:text-lg'>
                Register As
              </label>
              <div className='flex my-2'>
                <label className='flex items-center mx-1 text-sm md:text-lg'>
                  <input
                    type='radio'
                    name='role'
                    value='user'
                    onChange={handleChange}
                    className='mr-2'
                  />
                  Patient
                </label>

                <label className='flex items-center mx-1 text-sm md:text-lg'>
                  <input
                    type='radio'
                    name='role'
                    value='admin'
                    onChange={handleChange}
                    className='mr-2'
                  />
                  Admin
                </label>
              </div>
            </div>
            {registerData.role === "admin" ? (
              <div>
                <label htmlFor='username' className='block text-sm md:text-lg font-medium'>
                  Secret Key
                </label>
                <input
                  type='text'
                  id='secretKey'
                  name='secretKey'
                  placeholder='Enter Secret key'
                  onChange={(e) => setSecretKey(e.target.value)}
                  className='placeholder:text-sm md:placeholder:text-base text-black bg-white my-2 block w-full px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-lg'
                />
              </div>
            ) : (
              <></>
            )}
            <div>
              <label htmlFor='username' className='block text-sm md:text-lg font-medium'>
                Name
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={registerData.username}
                onChange={handleChange}
                placeholder='Enter your name'
                className='placeholder:text-sm md:placeholder:text-base text-black bg-white my-2 block w-full px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-lg'
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-sm md:text-lg font-medium'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={registerData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className='placeholder:text-sm md:placeholder:text-base text-black bg-white my-2 block w-full px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-lg'
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm md:text-lg font-medium'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={registerData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className='placeholder:text-sm md:placeholder:text-base text-black bg-white my-2 block w-full px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm md:text-lg'
              />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-medium py-1 px-2 text-sm md:text-lg md:py-2 py-1 px-2 md:px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
              Sign Up
            </button>
            <p className='text-center text-sm md:text-lg my-2'>
              Already have an account?{" "}
              <Link to='/login' className='text-blue-300 text-sm md:text-lg font-semibold'>
                Login Now
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
