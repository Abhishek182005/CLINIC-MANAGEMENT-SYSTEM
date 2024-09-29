// src/components/HistoryPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/history")
      .then((response) => setHistory(response.data))
      .catch((error) => console.error("Error fetching history:", error));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    axios
      .post(`http://localhost:5000/history/update-status/${id}`, {
        status: newStatus,
      })
      .then(() => {
        setHistory(
          history.map((item) =>
            item._id === id ? { ...item, status: newStatus } : item
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div className='container mx-auto p-4 mt-4'>
      <h1 className='text-center text-2xl font-bold mb-4'>
        Appointment History
      </h1>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Patient Name
              </th>
              <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Doctor Name
              </th>
              <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
              </th>
              <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>

              <th className='px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {history.map((item) => (
              <tr key={item._id}>
                <td className='px-4 py-2  whitespace-nowrap text-sm font-medium text-gray-900'>
                  {item.patientName}
                </td>
                <td className='px-4 py-2  whitespace-nowrap text-sm font-medium text-gray-900'>
                  {item.doctorName}
                </td>
                <td className='px-4 py-2  whitespace-nowrap text-sm font-medium text-gray-900'>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td
                  className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${
                    item.status === "Visited"
                      ? "text-green-500"
                      : item.status === "Not Visited"
                      ? " text-gray-500"
                      : item.status === "Cancelled"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {item.status}
                </td>
                <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <div className='flex justify-center'>
                    <div className='flex space-x-1'>
                      <button
                        onClick={() => handleStatusChange(item._id, "Visited")}
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                      >
                        Visited
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(item._id, "Not Visited")
                        }
                        className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                      >
                        Not Visited
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(item._id, "Cancelled")
                        }
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
