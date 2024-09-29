// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white shadow-md w-100'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand text-2xl font-bold text-gray-800 hover:text-indigo-600'
          to='/'
        >
          Clinic Management System
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                to='/'
                className={`nav-link text-lg font-medium text-gray-600 hover:text-indigo-600 ${
                  isLinkActive("/") ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/appointments'
                className={`nav-link text-lg font-medium text-gray-600 hover:text-indigo-600 ${
                  isLinkActive("/appointments") ? "active" : ""
                }`}
              >
                Appointments
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/doctors'
                className={`nav-link text-lg font-medium text-gray-600 hover:text-indigo-600 ${
                  isLinkActive("/doctors") ? "active" : ""
                }`}
              >
                Doctors
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/patients'
                className={`nav-link text-lg font-medium text-gray-600 hover:text-indigo-600 ${
                  isLinkActive("/patients") ? "active" : ""
                }`}
              >
                Patients
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/history'
                className={`nav-link text-lg font-medium text-gray-600 hover:text-indigo-600 ${
                  isLinkActive("/history") ? "active" : ""
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
