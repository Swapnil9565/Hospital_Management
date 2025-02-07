import React from "react";
import department from "../data/Department";

function DepartmentInfo() {
  return (
    <div className='bg-zinc-200 h-screen pt-5'>
      <div className="text-center ">
    <h1 className="text-blue-900 font-bold text-4xl underline">Departments</h1>
    </div>  
      <div className='flex flex-wrap gap-5 justify-center items-center h-[90vh]'>
        {department.map(({ id, dName, dDesc }) => {
          return (
            <div
              key={id}
              className='w-64 text-center bg-white border-2 border-zinc-200 flex flex-col items-center justify-center gap-5 p-3 rounded-md transition-transform  hover:scale-105'>
              <div>
                <h1 className='text-2xl font-bold'>{dName}</h1>
              </div>
              <div>
                <p className='leading-normal'>{dDesc}</p>
              </div>
              <button className='py-2 px-1 bg-blue-300 rounded-md font-medium hover:bg-blue-500'>
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
