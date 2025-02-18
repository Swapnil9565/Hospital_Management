import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmbulance, faBedPulse, faMicroscope, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import aboutImg from "../Assets/about.jpeg"
function About() {
  return (
    <div className="border-dashed border-t-2 border-slate-400 md:border-none w-full flex flex-wrap items-center justify-center h-[131vh] md:h-screen gap-x-2 md:gap-x-5 gap-y-0 md:gap-y-10">
      <div className="mb-0 mt-10 md:my-5 w-3/4 md:w-1/3">
              <img src={aboutImg} width={500} height={700} className='rounded-md'/>
      </div>
      <div className="my-5  w-3/4 md:w-1/3">
           <h1 className='font-bold text-xl md:text-3xl'>Best medical care for yourself and your family</h1>
           <p className='leading-normal my-5 text-justify'>Welcome to <b className='text-blue-400'>MedZone</b>, where compassionate care and advanced medical expertise meet to serve you and your loved ones. Our mission is to provide exceptional, patient-centered healthcare to our community and beyond, ensuring that each person who walks through our doors receives the highest quality treatment in a safe, comfortable, and supportive environment</p>
           <div className="flex flex-wrap items-center gap-4">
            <div className="bg-blue-200 rounded-full  text-center p-2 md:p-5 transition-all hover:bg-blue-300">
              <FontAwesomeIcon icon={faUserDoctor}/>
              <p className='text-sm md:text-md'>Qualified <br /><span className='text-blue-600 text-sm md:text-md'>Doctors</span></p>
            </div>
            <div className="bg-blue-200 rounded-full  text-center p-2 md:p-5 transition-all hover:bg-blue-300">
              <FontAwesomeIcon icon={faBedPulse}/>
              <p className='text-sm md:text-md'>Emergency <br /><span className='text-blue-600 text-sm md:text-md'>Services</span></p>
            </div>
            <div className="bg-blue-200 rounded-full  text-center p-2 md:p-5 transition-all hover:bg-blue-300">
              <FontAwesomeIcon icon={faMicroscope}/>
              <p className='text-sm md:text-md'>Accurate <br /><span className='text-blue-600 text-sm md:text-md'>Testing</span></p>
            </div>
            <div className="bg-blue-200 rounded-full  text-center p-2 md:p-5 transition-all hover:bg-blue-300">
              <FontAwesomeIcon icon={faAmbulance}/>
              <p className='text-sm md:text-md'>Free <br /><span className='text-blue-600 text-sm md:text-md'>Ambulance</span></p>
            </div>
           </div>
      </div>
    </div>
  )
}

export default About