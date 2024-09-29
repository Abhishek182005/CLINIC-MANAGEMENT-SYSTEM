// src/components/PatientCard.js
import React from "react";

const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 mb-4'>
      <h2 className='text-lg font-bold'>{patient.name}</h2>
      <p className='text-gray-600'>Age: {patient.age}</p>
      <p className='text-gray-600'>Gender: {patient.gender}</p>
      <div className='flex justify-between mt-4'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => onEdit(patient)}
        >
          Edit
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => onDelete(patient._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
