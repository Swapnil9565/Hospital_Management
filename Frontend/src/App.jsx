import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin"
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import AddDoctors from "./Pages/AddDoctors";
import SeeAppointments from "./Pages/SeeAppointments";
import Messages from "./Pages/Messages";
import Doctors from "./Pages/Doctors";

function App() {
  return (
    <>
      <Router>
        <Routes>
           <Route path='/' element={<Home />}/>
           <Route path="/register" element={<Register/>}/>
           <Route path="/login" element={<Login/>}/>

        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path='/appointment' element={<Appointment />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="doctors" element={<Doctors/>}/>
            <Route path="checkAppointments" element={<SeeAppointments/>}/>
            <Route path="addDoctors" element={<AddDoctors/>}/>
            <Route path="messages" element={<Messages/>}/>
          </Route>
        </Route>       
        </Routes>
      </Router>
    </>
  );
}

export default App;
