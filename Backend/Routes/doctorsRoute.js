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

    const photo = req.file.path;
     console.log(photo);
    const doctor = await doctorsModel.create({
      photo,
      docName,
      specialization,
      city,
      gender,
      contact,
    });

    res.status(200).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error("Error adding doctor:", error.message);
    res.status(500).json({ error: "Failed to add doctor", details: error.message });
  }
});

module.exports = router;
