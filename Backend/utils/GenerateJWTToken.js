const jwt = require("jsonwebtoken");
const dotnev=require("dotenv");
dotnev.config();
const generateJwtToken=(user)=>{
    const payload={id:user._id,role:user.role};
    const token=jwt.sign(payload,process.env.JWT_SECRET_KEY);
        return token;
}

module.exports=generateJwtToken;

