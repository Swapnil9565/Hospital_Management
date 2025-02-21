const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const doctorsModel = require("../models/doctorsModel");
const userModel = require("../models/userModel");
const messageModel = require("../models/MessageModel");
const appointmentModel = require("../models/appointmentModel");
const upload = require("../Config/CloudinaryConfig");

router.post("/addDoctor", upload.single("photo"), async (req, res) => {
  try {
    const { docName, specialization, city, gender, contact } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Photo is required" });
    }
    const photoUrl = req.file.path;

    const doctor = await doctorsModel.create({
      photo: photoUrl,
      docName,
      specialization,
      city,
      gender,
      contact,
    });

    res.status(200).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error("Error adding doctor:", error.message);
    res
      .status(500)
      .json({ error: "Failed to add doctor", details: error.message });
  }
});

router.get("/fetchDoctors", async (_, res) => {
  try {
    const doctors = await doctorsModel.find();
    if (!doctors) {
      res.status(404).json({ message: "Doctors not found" });
    }
    res.status(200).json({ message: "Doctors fetched successfully", doctors });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching doctors" });
  }
});
router.get("/fetchDoctorById",authMiddleware,async(req,res)=>{
  try {
    const doctorData = await doctorsModel.findById( req.user.id);
    if (!doctorData) {
      return res.status(404).json({ message: "doctorData not found" });
    }
    res.status(200).json({ doctorData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong while fetching doctor data" });
  }
})
router.get("/fetchUsers", async (req, res) => {
  try {
    const users = await userModel.find({ role: "user" });

    if (!users) {
      res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching users" });
  }
});
router.get("/fetchAppointments", async (_, res) => {
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

router.get("/fetchMessages", async (_, res) => {
  try {
    const messages = await messageModel.find();
    if (!messages) {
      return res.status(404).json({ message: "Messages not found" });
    }
    res
      .status(200)
      .json({ message: "Messages fetched successfully", messages });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching messages" });
  }
});

router.put("/editDoctor", async (req, res) => {
  const { photoUrl, docName, specialization, city, gender, contact } = req.body;
try {
  const updatedDoctor = await doctorsModel.findByIdAndUpdate(
    req.user.id,
    { photoUrl, docName, specialization, city, gender, contact },
    { new: true, runValidators: true }
  );

  if(!updatedDoctor){
     return res.status(400).json({message:"Doctor not found"});
  }
  res.status(200).json({ message: "Doctor updated successfully", updatedDoctor });
} catch (error) {
  console.log(error);
    res.status(500).json({ message: "Something went wrong while updating dcotor" });
}


});
module.exports = router;
