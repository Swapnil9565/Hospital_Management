const express = require("express");
const router = express.Router();
const doctorsModel = require("../models/doctorsModel");
const upload = require("../Config/MulterConfig");

router.post("/addDoctor", upload.single("photo"), async (req, res) => {

  try {
    const {docName, specialization, city, gender, contact } = req.body;
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: "Photo is required" });
    }

    const photoPath = req.file.path;
    const newDoctor=new Doctor({
      photo:photoPath,
      docName,
      specialization,
      city,
      gender,
      contact
    })
    await newDoctor.save();

    res.status(200).json({ message: "Doctor added successfully", newDoctor });
  } catch (error) {
    console.error("Error adding doctor:", error.message);
    res.status(500).json({ error: "Failed to add doctor", details: error.message });
  }
});

module.exports = router;
