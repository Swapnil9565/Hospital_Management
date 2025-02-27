const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const appointmentModel = require("../models/appointmentModel");
const MessageModel = require("../models/MessageModel");
const moment=require("moment");
const userModel = require("../models/userModel");

//Appointments post api
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
router.get("/fetchBooking/:userId",async(req,res)=>{
  try {
    const {userId}=req.params;
    const myBookings=await appointmentModel.find({userId});
    if(myBookings.length===0){
      return res.status(404).json({message:"Bookings not found"});
    }
    res.status(200).json({message:"Bookings fetched successfully",myBookings})
  } catch (error) {
    res.status(500).json({message:"internal Server error"})
  }

})

router.delete("/deleteAccount/:userId",authMiddleware,async(req,res)=>{
  try {
    const user=req.user;
    const {userId}=req.params;
    const deletedUser=await userModel.deleteOne({_id:userId})
    if(!user){
      return res.status(400).json({message:"User not found"});
    }
    res.status(200).json({message:"user deleted successfully",deletedUser})
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
  }
 
})
module.exports = router;
