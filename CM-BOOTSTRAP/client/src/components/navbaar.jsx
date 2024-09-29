// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav className='bg-white shadow-md w-full'>
      <div className='container mx-auto flex justify-between items-center py-4'>
        <Link
          className='text-2xl font-bold text-gray-800 hover:text-indigo-600'
          to='/'
        >
          Clinic Management System
        </Link>

        <ul className='flex space-x-8 items-center'>
          <li>
            <Link
              to='/'
              className={`text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors ${
                isLinkActive("/") ? "text-indigo-600 font-semibold" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
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
          <li>
            <Link
              to='/doctors'
              className={`text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors ${
                isLinkActive("/doctors") ? "text-indigo-600 font-semibold" : ""
              }`}
            >
              Doctors
            </Link>
          </li>
          <li>
            <Link
              to='/patients'
              className={`text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors ${
                isLinkActive("/patients") ? "text-indigo-600 font-semibold" : ""
              }`}
            >
              Patients
            </Link>
          </li>
          <li>
            <Link
              to='/history'
              className={`text-lg font-medium text-gray-600 hover:text-indigo-600 transition-colors ${
                isLinkActive("/history") ? "text-indigo-600 font-semibold" : ""
              }`}
            >
              Appointment History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
