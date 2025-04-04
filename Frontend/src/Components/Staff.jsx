import React from "react";
import doctors from "../data/Doctors";

function Staff({staffRef}) {
  return (
     <div className="bg-[#ababe9] h-auto pt-5" ref={staffRef} id="#staff">
    <div className="text-center ">
    <h1 className="text-blue-900 font-bold text-xl md:text-4xl underline">Our Doctors</h1>
    <p className="text-md md:text-lg">Qualified Healthcare Professionals</p>
    </div>  
    <div className="flex flex-wrap justify-center items-center gap-10 py-10 md:gap-5 md:py-20">
      {doctors.map(({ id, docImg, docDept, docName, docSpecialization }) => {
        return (
          <div
            key={id}
            className='w-72 md:w-64 h-[75vh] md:h-[60vh] flex flex-col items-center justify-center border-2 border-gray-200 rounded-md  bg-white transition-transform hover:scale-105'>
            <div className='aspect-square'>{docImg}</div>
            <div className='mt-4'>
              <h1 className="text-lg font-bold">{docName}</h1>
            </div>
            <div className='my-2'>
              <p className="font-medium text-zinc-700">{docDept}</p>
              </div>
            <div className='desc'>
              <p className="text-center">{docSpecialization}</p>
              </div>
          </div>
        );
      })}
    </div>
</div>
  );
}

export default Staff;
