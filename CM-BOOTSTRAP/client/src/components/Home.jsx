// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className='container mt-5'>
      <h1 className='text-center text-success mb-4'>
        Welcome to the Clinic Management System
      </h1>
      <p className='text-center lead mb-4'>
        Manage appointments, patients, and doctors efficiently and effectively.
      </p>
      <div className='d-flex flex-column flex-md-row justify-content-center'>
        <Link to='/appointments' className='btn btn-primary m-2'>
          View Appointments
        </Link>
        <Link to='/doctors' className='btn btn-primary m-2'>
          View Doctors
        </Link>
        <Link to='/patients' className='btn btn-primary m-2'>
          View Patients
        </Link>
        <Link to='/history' className='btn btn-primary m-2'>
          Appointment History
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
