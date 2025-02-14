const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/authMiddleware");
const MessageModel = require("../models/MessageModel");

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

router.get("/checkMessages",authMiddleware,async(_,res)=>{
    try {
        const messages=await MessageModel.find();
        if(messages.length>0){
            return res.status(200).json({message:"Messages fetched successfully",messages})
        }
        res.status(404).json({message:"No messages yet..!"});
    } catch (error) {
        console.log(error);
        alert(error);
    }
})
module.exports = router;