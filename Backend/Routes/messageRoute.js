const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/authMiddleware");
const MessageModel = require("../models/MessageModel");

router.post("/message",authMiddleware,async(req,res)=>{
    const {name,email,contact,message}=req.body;
    try {
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