// src/components/Doctors.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "" });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios
      .get("http://localhost:5000/doctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialty) {
      console.error("All fields are required.");
      return;
    }
    axios
      .post("http://localhost:5000/doctors/add", newDoctor)
      .then((response) => {
        setDoctors([...doctors, response.data]);
        setNewDoctor({ name: "", specialty: "" });
      })
      .catch((error) => console.error("Error adding doctor:", error));
  };

  const handleUpdateDoctor = (id, e) => {
    e.preventDefault();
    if (!selectedDoctor.name || !selectedDoctor.specialty) {
      console.error("All fields are required.");
      return;
    }
    axios
      .post(`http://localhost:5000/doctors/update/${id}`, selectedDoctor)
      .then((response) => {
        const updatedDoc = { ...selectedDoctor, _id: id };
        setDoctors(
          doctors.map((doctor) => (doctor._id === id ? updatedDoc : doctor))
        );
        setSelectedDoctor(null);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating doctor:", error));
  };

  const handleDeleteDoctor = (id) => {
    axios
      .delete(`http://localhost:5000/doctors/delete/${id}`)
      .then((response) => {
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      })
      .catch((error) => console.error("Error deleting doctor:", error));
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  };

  return (
    <div className='container mx-auto p-4 mt-4'>
      <div className='flex flex-wrap justify-center'>
        <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
          <div className='bg-white rounded-lg shadow-md p-4'>
            <h2 className='text-center text-2xl font-bold mb-4'>
              {isEditMode ? "Edit Doctor" : "Add New Doctor"}
            </h2>
            <form
              onSubmit={
                isEditMode
                  ? (e) => handleUpdateDoctor(selectedDoctor._id, e)
                  : handleAddDoctor
              }
            >
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  placeholder='Enter doctor name'
                  value={isEditMode ? selectedDoctor.name : newDoctor.name}
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedDoctor({
                          ...selectedDoctor,
                          name: e.target.value,
                        })
                      : setNewDoctor({
                          ...newDoctor,
                          name: e.target.value,
                        })
                  }
                  className='block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Specialty
                </label>
                <input
                  type='text'
                  placeholder='Enter specialty'
                  value={
                    isEditMode ? selectedDoctor.specialty : newDoctor.specialty
                  }
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedDoctor({
                          ...selectedDoctor,
                          specialty: e.target.value,
                        })
                      : setNewDoctor({
                          ...newDoctor,
                          specialty: e.target.value,
                        })
                  }
                  className='block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
              >
                {isEditMode ? "Update Doctor" : "Add Doctor"}
              </button>
            </form>
          </div>
        </div>

        <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
          <h2 className='text-center text-2xl font-bold mb-4'>Doctors List</h2>
          <table className='table-auto w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Specialty
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {doctor.name}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {doctor.specialty}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <div className='flex justify-between'>
                      <button
                        type='button'
                        className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => handleEditDoctor(doctor)}
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => handleDeleteDoctor(doctor._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
