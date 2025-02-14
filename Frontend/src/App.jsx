import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin/Admin"
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import AddDoctors from "./Pages/Admin/AddDoctors";
import SeeAppointments from "./Pages/Admin/CheckAppointments";
import Doctors from "./Pages/Admin/Doctors";
import CheckMessages from "./Pages/Admin/CheckMessages";

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
            <Route path="messages" element={<CheckMessages/>}/>
          </Route>
        </Route>       
        </Routes>
      </Router>
    </>
  );
}

export default App;
