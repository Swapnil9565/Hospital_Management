const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const appointmentModel = require("../models/appointmentModel");
const MessageModel = require("../models/MessageModel");
const moment=require("moment");

//Appointments apis
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

//Messages post api
router.post("/message",authMiddleware,async(req,res)=>{
    const {name,email,contact,message}=req.body;
    try {
         const existingMsg=await MessageModel.findOne({email});
         if(existingMsg){
            return res.status(400).json({message:"Message already sent using this email"})
         }

        const createdMsg=await MessageModel.create({
            name,
            email,
            contact,
            message
        });
        await createdMsg.save();
        res.status(200).json({message:"Message send Successfully",createdMsg});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to send message' });
    }

})
module.exports = router;
