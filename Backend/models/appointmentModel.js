const mongoose=require("mongoose");

const appointmentSchema=new mongoose.Schema({
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    department:{
        type:String,
        enum:["Cardiology","Orthopedic","Gynacology","Neurology","Dermatology","Pediatrics"],
        required:true
    },
    gender:{
        type:String,
        enum:["Male","Female"],
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

module.exports=mongoose.model("Appointment",appointmentSchema);