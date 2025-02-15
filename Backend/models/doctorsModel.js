const mongoose=require("mongoose");

const doctorSchema=new mongoose.Schema({
    photo:{
        type:String,
        required:true
    },
    docName:{
       type:String,
       required:true
    },
    specialization:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports=mongoose.model("doctor",doctorSchema);