const express = require("express");
const router = express.Router();
const doctorsModel = require("../models/doctorsModel");
const upload=require("../Config/MulterConfig");
router.post("/addDoctor",upload.single("photo"), async (req, res) => {
  try {
    const {docName, specialization, city, gender, contact}= req.body;
    const photo=`/uploads/doctors/${req.file.filename}`
    const doctor = await doctorsModel.create({
      photo,
      docName,
      specialization,
      city,
      gender,
      contact,
    });
    res.status(200).json({message:"Doctor added successfully",doctor});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
  }
});

module.exports=router;