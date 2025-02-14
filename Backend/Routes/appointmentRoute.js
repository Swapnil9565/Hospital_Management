const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const appointmentModel = require("../models/appointmentModel");
const moment=require("moment");

router.post("/appointment", authMiddleware, async (req, res) => {
  const user = req.user;
  const { fName, lName, email, mobile, department,gender, date, time } = req.body;
  try{
    const formattedDate=moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    const formattedTime=moment(time,"HH:mm").format("hh:mm A");
     const appointment = await appointmentModel.create({
       fName,
       lName,
       email,
       mobile,
       department,
       gender,
       date:formattedDate,
       time:formattedTime,
       userId: user.id,
     });
     res.status(200).json({ message:"Appointment confirmed successfully",appointment });
  }catch(err){
     res.status(500).json({message:"Something went wrong"})
     console.log(err);
  }
});

router.get("/checkAppointments",authMiddleware, async (_, res) => {
  try {
      const appointments = await appointmentModel.find();
           
      if (appointments.length > 0) {
          return res.status(200).json({ message: "Appointments", appointments });
      } else {
          return res.status(404).json({ message: "No appointments yet" });
      }
  } catch (error) {
      console.error("Error fetching appointments:", error);
      return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
