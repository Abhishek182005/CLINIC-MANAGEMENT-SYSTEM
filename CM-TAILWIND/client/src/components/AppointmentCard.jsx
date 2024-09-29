import React from "react";

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
      <div className='bg-white rounded-lg shadow-md p-4 h-full'>
        <div className='flex flex-col h-full justify-between'>
          <div>
            <p className='text-gray-600 font-bold mb-2'>
              <strong>Patient: </strong>
              {appointment.patientName}
            </p>
            <p className='text-gray-600 font-bold mb-2'>
              <strong>Doctor: </strong>
              {appointment.doctorName}
            </p>
            <p className='text-gray-600 font-bold mb-2'>
              <strong>Date: </strong>
              {new Date(appointment.date).toLocaleDateString()}
            </p>
            <p className='text-gray-600 font-bold mb-2'>
              <strong>Status: </strong>
              {appointment.status}
            </p>
            {appointment.status === "Postponed" && (
              <p className='text-gray-600 font-bold mb-2'>
                <strong>New Date: </strong>
                {appointment.newDate
                  ? new Date(appointment.newDate).toLocaleDateString()
                  : "N/A"}
              </p>
            )}
          </div>
          <div className='flex justify-between mt-4'>
            <button
              className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => onEdit(appointment)}
            >
              Edit
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => onDelete(appointment._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
