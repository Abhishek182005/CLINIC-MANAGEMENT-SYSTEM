// src/components/Patients.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/patients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const handleAddPatient = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/patients/add", newPatient)
      .then((response) => {
        setPatients([...patients, response.data]);
        setNewPatient({ name: "", age: "", gender: "" });
      })
      .catch((error) => console.error("Error adding patient:", error));
  };

  const handleUpdatePatient = (id, e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/patients/update/${id}`, selectedPatient)
      .then((response) => {
        const updatedPatient = { ...selectedPatient, _id: id };
        setPatients(
          patients.map((patient) =>
            patient._id === id ? updatedPatient : patient
          )
        );
        setSelectedPatient(null);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating patient:", error));
  };

  const handleDeletePatient = (id) => {
    axios
      .delete(`http://localhost:5000/patients/delete/${id}`)
      .then((response) => {
        setPatients(patients.filter((patient) => patient._id !== id));
      })
      .catch((error) => console.error("Error deleting patient:", error));
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  return (
    <div className='container mx-auto p-4 mt-4'>
      <div className='flex flex-wrap justify-center'>
        <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
          <div className='bg-white rounded-lg shadow-md p-4'>
            <h2 className='text-center text-2xl font-bold mb-4'>
              {isEditMode ? "Edit Patient" : "Add New Patient"}
            </h2>
            <form
              onSubmit={
                isEditMode
                  ? (e) => handleUpdatePatient(selectedPatient._id, e)
                  : handleAddPatient
              }
            >
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Name:
                </label>
                <input
                  type='text'
                  value={isEditMode ? selectedPatient.name : newPatient.name}
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedPatient({
                          ...selectedPatient,
                          name: e.target.value,
                        })
                      : setNewPatient({ ...newPatient, name: e.target.value })
                  }
                  className='block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Age:
                </label>
                <input
                  type='text'
                  value={isEditMode ? selectedPatient.age : newPatient.age}
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedPatient({
                          ...selectedPatient,
                          age: e.target.value,
                        })
                      : setNewPatient({ ...newPatient, age: e.target.value })
                  }
                  className='block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Gender:
                </label>
                <select
                  value={
                    isEditMode ? selectedPatient.gender : newPatient.gender
                  }
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedPatient({
                          ...selectedPatient,
                          gender: e.target.value,
                        })
                      : setNewPatient({
                          ...newPatient,
                          gender: e.target.value,
                        })
                  }
                  className='block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                >
                  <option value=''>Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
              >
                {isEditMode ? "Update Patient" : "Add Patient"}
              </button>
            </form>
          </div>
        </div>
        <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
          <h2 className='text-center text-2xl font-bold mb-4'>Patients List</h2>
          <table className='table-auto w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Age
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Gender
                </th>
                <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {patient.name}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {patient.age}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {patient.gender}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <div className='flex justify-between'>
                      <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => handleEditPatient(patient)}
                      >
                        Edit
                      </button>
                      <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => handleDeletePatient(patient._id)}
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

export default Patients;
  