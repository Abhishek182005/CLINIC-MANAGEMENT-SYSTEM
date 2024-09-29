import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch appointments
    axios
      .get("http://localhost:5000/appointments")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));

    // Fetch doctors
    axios
      .get("http://localhost:5000/doctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));

    // Fetch patients
    axios
      .get("http://localhost:5000/patients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (
      !newAppointment.patientId ||
      !newAppointment.doctorId ||
      !newAppointment.date
    ) {
      console.error("All fields are required.");
      return;
    }
    const appointmentData = {
      patientId: newAppointment.patientId,
      doctorId: newAppointment.doctorId,
      date: newAppointment.date,
      patientName: patients.find(
        (patient) => patient._id === newAppointment.patientId
      )?.name,
      doctorName: doctors.find(
        (doctor) => doctor._id === newAppointment.doctorId
      )?.name,
    };
    axios
      .post("http://localhost:5000/appointments/add", appointmentData)
      .then((response) => {
        setAppointments([...appointments, response.data]);
        setNewAppointment({
          patientId: "",
          doctorId: "",
          date: "",
        });
      })
      .catch((error) => console.error("Error adding appointment:", error));
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();
    if (
      !selectedAppointment.patientId ||
      !selectedAppointment.doctorId ||
      !selectedAppointment.date
    ) {
      console.error("All fields are required.");
      return;
    }
    const appointmentData = {
      patientId: selectedAppointment.patientId,
      doctorId: selectedAppointment.doctorId,
      date: selectedAppointment.date,
      patientName: patients.find(
        (patient) => patient._id === selectedAppointment.patientId
      )?.name,
      doctorName: doctors.find(
        (doctor) => doctor._id === selectedAppointment.doctorId
      )?.name,
    };
    axios
      .post(`http://localhost:5000/appointments/update/${id}`, appointmentData)
      .then((response) => {
        const updatedApp = {
          ...selectedAppointment,
          _id: id,
        };
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id ? updatedApp : appointment
          )
        );
        setSelectedAppointment(null);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`http://localhost:5000/appointments/delete/${id}`)
      .then((response) => {
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true);
  };

  return (
    <div className='container mx-auto p-4 mt-4'>
      <div className='flex flex-wrap justify-center'>
        <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
          <div className='bg-white rounded-lg shadow-md p-4'>
            <h2 className='text-center text-lg font-bold mb-4'>
              {isEditMode ? "Edit Appointment" : "Add New Appointment"}
            </h2>
            <form
              onSubmit={
                isEditMode
                  ? (e) => handleUpdateAppointment(selectedAppointment._id, e)
                  : handleAddAppointment
              }
            >
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Patient:
                </label>
                <select
                  value={
                    isEditMode
                      ? selectedAppointment.patientId
                      : newAppointment.patientId
                  }
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedAppointment({
                          ...selectedAppointment,
                          patientId: e.target.value,
                        })
                      : setNewAppointment({
                          ...newAppointment,
                          patientId: e.target.value,
                        })
                  }
                  className='block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                >
                  <option value=''>Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Doctor:
                </label>
                <select
                  value={
                    isEditMode
                      ? selectedAppointment.doctorId
                      : newAppointment.doctorId
                  }
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedAppointment({
                          ...selectedAppointment,
                          doctorId: e.target.value,
                        })
                      : setNewAppointment({
                          ...newAppointment,
                          doctorId: e.target.value,
                        })
                  }
                  className='block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                >
                  <option value=''>Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Date:
                </label>
                <input
                  type='date'
                  value={
                    isEditMode
                      ? new Date(selectedAppointment.date)
                          .toISOString()
                          .split("T")[0]
                      : newAppointment.date
                  }
                  onChange={(e) =>
                    isEditMode
                      ? setSelectedAppointment({
                          ...selectedAppointment,
                          date: e.target.value,
                        })
                      : setNewAppointment({
                          ...newAppointment,
                          date: e.target.value,
                        })
                  }
                  className='block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                {isEditMode ? "Update Appointment" : "Add Appointment"}
              </button>
            </form>
          </div>
        </div>
        <div className='w-full md:w-1/2 xl:w-1/3 p-4'>
          <h2 className='text-center text-lg font-bold mb-4'>
            Appointments List
          </h2>
          <table className='table-auto w-full'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Patient</th>
                <th className='px-4 py-2'>Doctor</th>
                <th className='px-4 py-2'>Date</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className='border px-4 py-2'>
                    {appointment.patientName}
                  </td>
                  <td className='border px-4 py-2'>{appointment.doctorName}</td>
                  <td className='border px-4 py-2'>
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className='border px-4 py-2'>
                    <div className='flex justify-start'>
                      <button
                        className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2'
                        onClick={() => handleEditAppointment(appointment)}
                      >
                        Edit
                      </button>
                      <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => handleDeleteAppointment(appointment._id)}
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

export default Appointments;
