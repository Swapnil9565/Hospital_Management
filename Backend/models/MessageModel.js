const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
  full_name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  contact:{
    type:String,
    required:true
  },
  feedback:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
})

module.exports=mongoose.model("message",messageSchema);