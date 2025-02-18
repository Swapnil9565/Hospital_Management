import React from "react";
import department from "../data/Department";

function DepartmentInfo() {
  return (
    <div className='bg-zinc-200 h-auto md:h-screen pt-5'>
      <div className="text-center ">
    <h1 className="text-blue-900 font-bold text-xl md:text-4xl underline my-5 md:mb-20 uppercase">Departments</h1>
    </div>  
      <div className='flex flex-wrap gap-7 md:gap-5 justify-center items-center'>
        {department.map(({ id, dName, dDesc }) => {
          return (
            <div
              key={id}
              className='w-72 md:w-64 text-center bg-white border-2 border-zinc-200 flex flex-col items-center justify-center gap-5 p-3 rounded-md transition-transform  hover:scale-105'>
              <div>
                <h1 className='text-xl md:text-2xl font-bold'>{dName}</h1>
              </div>
              <div>
                <p className='leading-normal text-sm md:text-md'>{dDesc}</p>
              </div>
              <button className='py-1 md:py-2 px-1 bg-blue-300 rounded-md text-sm md:text-lg hover:bg-blue-500'>
                Read More &gt;&gt;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DepartmentInfo;
