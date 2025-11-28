const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const appointmentModel = require("../models/appointmentModel");
const MessageModel = require("../models/MessageModel");
const moment = require("moment");
const userModel = require("../models/userModel");

//Create a new appointment
router.post("/appointment", authMiddleware, async (req, res) => {
  const user = req.user;
  const { fName, lName, email, mobile, department, gender, date, time } =
    req.body;
  try {
    const formattedDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    const appointment = await appointmentModel.create({
      fName,
      lName,
      email,
      mobile,
      department,
      gender,
      date: formattedDate,
      time,
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
//Getting appointment details by id
router.get("/appointment/:id",async(req,res)=>{
  const {id}=req.params;
try {
  const appointmentData=await appointmentModel.findById(id);

  if(!appointmentData){
    return res.status(404).json({message:"Appointment data not found"})
  }
  res.status(200).json({message:"Appointment data fetched successfully",appointmentData})
  
} catch (error) {
  res.status(500).json({ message: "Error fetching appointment", error: error.message });
}
})
// Updating existing appointment
router.put("/updateAppointment/:id", async (req, res) => {
  const { id } = req.params;
  const { fName, lName, email, mobile, department, gender, date, time } =
    req.body;
  try {
    const updateAppointment = await appointmentModel.findByIdAndUpdate(
      id,
      { fName, lName, email, mobile, department, gender, date, time },
      { new: true, runValidators: true }
    );

    if (!updateAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment updated successfully", updateAppointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error: error.message });
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
router.get("/fetchUserInfo", authMiddleware, async (req, res) => {
  const userInfo = await userModel.findById(req.user.id);
  try {
    if (!userInfo) {
      return res.status(404).json({ message: "User info not found" });
    }
    res
      .status(200)
      .json({ message: "User info fetched successfully", userInfo });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
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
        return res
          .status(400)
          .json({ message: "This password has already been used" });
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
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await client.chat.completions.create({
      model: "gpt-5.1",
      messages: [
        { role: "system", content: "You are a hospital appointment assistant." },
        { role: "user", content: userMessage }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.error(err);

    if (err.status === 429) {
      return res.status(429).json({ reply: "⚠️ Too many requests. Please wait and try again." });
    }

    res.status(500).json({ reply: "⚠️ Server error. Try again later." });
  }
});
module.exports = router;
