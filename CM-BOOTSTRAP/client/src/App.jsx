import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointments from "./components/Appointments.jsx";
import Doctors from "./components/Doctors.jsx";
import Patients from "./components/Patients.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import Navbar from "./components/navbaar.jsx";
import HistoryPage from "./components/HistoryPage.jsx";
import HomePage from "./components/Home.jsx";

const App = () => {
  return (
    <Router>
      <div className='container mt-4'>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/patients' element={<Patients />} />
            <Route path='/history' element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
