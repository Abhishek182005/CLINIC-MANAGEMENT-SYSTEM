// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='container mx-auto p-4 mt-4'>
      <h1 className='text-center text-lg font-bold mb-4'>
        Welcome to the Clinic Management System
      </h1>
      <p className='text-center text-lg mb-4'>
        Manage appointments, patients, and doctors efficiently and effectively.
      </p>
      <div className='flex flex-wrap justify-center'>
        <Link
          to='/appointments'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
        >
          View Appointments
        </Link>
        <Link
          to='/doctors'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
        >
          View Doctors
        </Link>
        <Link
          to='/patients'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
        >
          View Patients
        </Link>
        <Link
          to='/history'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
        >
          Appointment History
        </Link>
      </div>
    </div>
  );
};

export default Home;
