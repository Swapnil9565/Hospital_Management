import React from 'react'

const Setting = () => {
  return (
    <div className="px-2 md:px-6 py-1">
    <h1 className="text-lg md:text-2xl font-semibold my-4">Profile Settings</h1>
    <form className="flex flex-col gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border-b-2 border-gray-400 focus:border-blue-500 outline-none text-sm md:text-lg py-2 px-1 transition-all"
        />
      </div>
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          className="w-full border-b-2 border-gray-400 focus:border-blue-500 outline-none text-sm md:text-lg py-2 px-1 transition-all"
        />
      </div>
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          className="w-full border-b-2 border-gray-400 focus:border-blue-500 outline-none text-sm md:text-lg py-2 px-1 transition-all"
        />
      </div>
      <div className="flex items-center gap-4 mt-2">
        <span className="font-medium">Gender:</span>
        <label className="flex items-center gap-1">
          <input type="radio" name="gender" className="accent-blue-500 text-sm md:text-lg " />
          Male
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="gender" className="accent-blue-500 text-sm md:text-lg" />
          Female
        </label>
      </div>
      <button className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all text-sm md:text-lg">
        Update Profile
      </button>
    </form>
  </div>
  
  )
}

export default Setting