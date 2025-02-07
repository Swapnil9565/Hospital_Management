import React from 'react'
import services from '../data/Service';

function ServicesInfo() {
  return (
    <div className='bg-zinc-200 h- h-auto pt-5'>
    <div className="text-center py-4 ">
  <h1 className="text-blue-900 font-bold text-4xl underline">Services</h1>
  <p>Our Excellent Services</p>
  </div>  
    <div className='flex flex-wrap gap-5 justify-center items-center pb-5'>
      {services.map(({ id,icon, sName, sDesc }) => {
        return (
          <div
            key={id}
            className='w-72 h-[40vh] text-center bg-white border-2 border-zinc-200 flex flex-col items-center justify-center gap-5 p-3 rounded-md transition-transform  hover:scale-105'>
           <div className="text-3xl w-24 rounded-bl-2xl rounded-tr-2xl py-4 bg-[#13c5dd] text-white font-bold">
            {icon}
           </div>
           
            <div>
              <h1 className='text-2xl font-bold'>{sName}</h1>
            </div>
            <div>
              <p className='leading-normal'>{sDesc}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  )
}

export default ServicesInfo