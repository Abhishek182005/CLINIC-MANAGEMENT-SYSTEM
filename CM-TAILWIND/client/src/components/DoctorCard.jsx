import React from "react";

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
      <div className='bg-white rounded-lg shadow-md p-4 h-full'>
        <div className='flex flex-col h-full justify-between'>
          <div>
            <h2 className='text-lg font-bold'>{doctor.name}</h2>
            <p className='text-gray-600'>{doctor.specialty}</p>
          </div>
          <div className='flex justify-between mt-4'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => onEdit(doctor)}
            >
              Edit
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => onDelete(doctor._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
