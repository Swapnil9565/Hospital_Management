import React from "react";

const Message = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-2xl text-center">
        <h1 className="text-gray-800 font-bold text-3xl mt-6">Drop Us a Message</h1>
        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact No"
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <textarea
              name="message"
              rows="7"
              placeholder="Leave your feedback..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
          <div className="col-span-2">
            <button className="bg-purple-600 text-white w-full py-3 rounded-full font-semibold text-lg hover:bg-purple-700 transition duration-300">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Message;
