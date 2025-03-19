const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const appointmentModel = require("../models/appointmentModel");
const MessageModel = require("../models/MessageModel");
const moment = require("moment");
const userModel = require("../models/userModel");

//Appointments post api
router.post("/appointment", authMiddleware, async (req, res) => {
  const user = req.user;
  const { fName, lName, email, mobile, department, gender, date, time } =
    req.body;
  try {
    const formattedDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    const formattedTime = moment(time, "HH:mm").format("hh:mm A");
    const appointment = await appointmentModel.create({
      fName,
      lName,
      email,
      mobile,
      department,
      gender,
      date: formattedDate,
      time: formattedTime,
      userId: user.id,
    });
    res
      .status(200)
      .json({ message: "Appointment confirmed successfully", appointment });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
});

//Messages post api
router.post("/message", authMiddleware, async (req, res) => {
  const { name, email, contact, message } = req.body;
  try {
    const existingMsg = await MessageModel.findOne({ email });
    if (existingMsg) {
      return res
        .status(400)
        .json({ message: "Message already sent using this email" });
    }

    const createdMsg = await MessageModel.create({
      name,
      email,
      contact,
      message,
    });
    await createdMsg.save();
    res.status(200).json({ message: "Message send Successfully", createdMsg });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send message" });
  }
});
//Get request for fetching bookings
router.get("/fetchBooking/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const myBookings = await appointmentModel.find({ userId });
    if (myBookings.length === 0) {
      return res.status(404).json({ message: "Bookings not found" });
    }
    res
      .status(200)
      .json({ message: "Bookings fetched successfully", myBookings });
  } catch (error) {
    res.status(500).json({ message: "internal Server error" });
  }
});
//Deleting user account
router.delete("/deleteAccount/:userId", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    const deletedUser = await userModel.deleteOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ message: "user deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//deleting appointment booked by user
router.delete("/cancelAppointment/:appoId", async (req, res) => {
  try {
    const { appoId } = req.params;
    const appointment = await appointmentModel.findByIdAndDelete(appoId);
    if (appointment.deletedCount === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res
      .status(200)
      .json({ message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//fetching user info by their id
router.get("/fetchUserInfo",authMiddleware,async(req,res)=>{
    const userInfo=await userModel.findById(req.user.id);
    try {
      if(!userInfo){
        return res.status(404).json({message:"User info not found"});
      }
      res.status(200).json({message:"User info fetched successfully",userInfo});
    } catch (error) {
      return res.status(500).json({message:"Internal server error"});
    }
  
})
//Updating user info
router.patch("/updateProfile", authMiddleware, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (email) {
      return res.status(403).json({ message: "Email cannot be changed" });
    }

    let user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;

    if (password) {
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return res.status(400).json({ message: "New password cannot be the same as the old password" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});
module.exports = router;
