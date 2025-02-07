import React from 'react'
import { Navigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"
const ProtectedRoute = (element,requiredRole) => {
   const token=localStorage.getItem("token");
   
   try {
      const payload=jwtDecode(token);
      if(requiredRole&& payload.role!==requiredRole){
         return <Navigate to="/"/>;
      }
      return element;
   } catch (error) {
      console.log("invalid Token",error);
      return <Navigate to="/"/>
   }
}

export default ProtectedRoute;