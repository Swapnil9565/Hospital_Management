import "./App.css";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientAppointments from "./Components/PatientAppointments";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
           <Route path="/register" element={<Register/>}/>
           <Route path="/login" element={<Login/>}/>
          <Route path='/patientApointments' element={<PatientAppointments />}/>
          <Route path='/appointment' element={<Appointment />}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
