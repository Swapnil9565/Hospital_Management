import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="w-full  bg-blue-900 p-6 text-center">
    <div className="flex flex-wrap justify-around text-white">
      <div className="mb-6">
        <h3 className="text-cyan-400 text-lg uppercase mb-2">Get in Touch</h3>
        <ul className="list-none p-0">
          <li>123 Hospital Street</li>
          <li>City, Country</li>
          <li>Phone: +1234567890</li>
          <li>Email: info@example.com</li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-cyan-400 text-lg uppercase mb-2">Quick Links</h3>
        <div className="flex flex-col justify-start items-start">
          <p className="mb-2 text-white hover:text-cyan-400" >
             <FontAwesomeIcon icon={faAngleRight} className='mr-2'/>Home
          </p>
          <p className="mb-2 text-white hover:text-cyan-400" >
                   <FontAwesomeIcon icon={faAngleRight} className='mr-2'/>About Us
          </p>
          <p className="mb-2 text-white hover:text-cyan-400" >
                     <FontAwesomeIcon icon={faAngleRight} className='mr-2'/>Services
          </p>
          <p className="mb-2 text-white hover:text-cyan-400" >
                   <FontAwesomeIcon icon={faAngleRight} className='mr-2'/>Doctors
          </p>
          <p className="mb-2 text-white hover:text-cyan-400" >
           <FontAwesomeIcon icon={faAngleRight} className='mr-2'/>Departments
          </p>
        </div>
      </div>
      <div className="mb-6 text-start">
        <h3 className="text-cyan-400 text-lg uppercase mb-2">Newsletter</h3>
        <p className="text-white">Subscribe to our newsletter for updates.</p>
        <form className="mt-5 flex items-center  justify-center gap-5">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-3/4 text-center p-2"
          />
          <button
            type="submit"
            className="p-2 bg-cyan-400 rounded-lg hover:bg-cyan-500 cursor-pointer">
            Subscribe
          </button>
        </form>
      </div>
      <div className="mb-6">
        <h3 className="text-cyan-400 text-lg uppercase mb-2">Follow Us</h3>
        <div className="flex space-x-4">
         
          <a  href='#' className="text-white bg-cyan-400 rounded-full p-3 hover:text-black">
          <FontAwesomeIcon icon={faFacebook}/>
          </a>
          <a href='#' className="text-white bg-cyan-400 rounded-full p-3 hover:text-black">
            <FontAwesomeIcon icon={faTwitter}/>
          </a>
          <a href='#' className="text-white bg-cyan-400 rounded-full p-3 hover:text-black">
              <FontAwesomeIcon icon={faInstagram}/>
          </a>
          <a href='#' className="text-white bg-cyan-400 rounded-full p-3 hover:text-black">
          <FontAwesomeIcon icon={faLinkedin}/>
          </a>
        </div>
      </div>
      
    </div>
  </footer>
  )
}

export default Footer