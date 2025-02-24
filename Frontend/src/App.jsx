import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin/Admin"
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import AddDoctors from "./Pages/Admin/AddDoctors";
import SeeAppointments from "./Pages/Admin/CheckAppointments";
import CheckMessages from "./Pages/Admin/CheckMessages";
import CheckDoctors from "./Pages/Admin/CheckDoctors";
import User from "./Pages/Admin/User";
import UserDashboard from "./Pages/UserDashboard";

function App() {
   const [isLoggedIn,setIsLoggedIn]=useState(false);
  return (
    <>
      <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
           <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>}/>
           <Route path="/register" element={<Register/>}/>
           <Route path="/login" element={<Login/>}/>

        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path='/appointment' element={<Appointment />} />
          <Route path="/userDashboard" element={<UserDashboard setIsLoggedIn={setIsLoggedIn}/>}/>
        </Route>

        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="doctors" element={<CheckDoctors/>}/>
            <Route path="allUsers" element={<User/>}/>
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
