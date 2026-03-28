const express=require("express");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
dotenv.config();
const userModel = require("../models/userModel");
const generateJwtToken = require("../utils/GenerateJWTToken");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("Welcome to Medzone");
})

router.post("/register",async (req,res)=>{
    const {username,email,password,role}=req.body;
    try {
        const user=await userModel.findOne({email});

        if(user){
           return res.status(401).json({message:"User already exist"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        await userModel.create({
            username,
            email,
            password:hashPassword,
            role
        })
        res.status(200).json({message:"Registered successfully",user:{username,role}})
        
    } catch (error) {
        res.status(400).json({"message":error.message});
    }
})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const checkPasword=await bcrypt.compare(password,user.password);
        if(!checkPasword){
            return res.status(400).json({message:"Invalid email or password"});
        }
         const token=generateJwtToken(user);
         res.status(200).json({message:"Login successfully",token,user})
    } catch (error) {
        res.status(500).json(error.message,"Internal server error");
    }
 
})
module.exports=router;