// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav className='bg-white shadow-lg top-0 left-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        {/* Logo or Title */}
        <Link
          className='text-2xl font-bold text-gray-800 hover:text-indigo-600'
          to='#'
        >
          Clinic Management System
        </Link>

        {/* Toggle Button for smaller screens */}
        <button
          className='block md:hidden text-gray-800 focus:outline-none'
          type='button'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16m-7 6h7'
            ></path>
          </svg>
        </button>

        {/* Nav Links */}
        <div className='hidden md:flex md:items-center'>
          <ul className='flex space-x-6'>
            <li className='nav-item'>
              <Link
                to='/'
                className={`text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors ${
                  isLinkActive("/") ? "text-indigo-600 font-semibold" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/appointments'
                className={`text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors ${
                  isLinkActive("/appointments")
                    ? "text-indigo-600 font-semibold"
                    : ""
                }`}
              >
                Appointments
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/doctors'
                className={`text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors ${
                  isLinkActive("/doctors")
                    ? "text-indigo-600 font-semibold"
                    : ""
                }`}
              >
                Doctors
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/patients'
                className={`text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors ${
                  isLinkActive("/patients")
                    ? "text-indigo-600 font-semibold"
                    : ""
                }`}
              >
                Patients
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/history'
                className={`text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors ${
                  isLinkActive("/history")
                    ? "text-indigo-600 font-semibold"
                    : ""
                }`}
              >
                Appointment History
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
