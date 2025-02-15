const express=require("express");
const path=require("path");
const dotenv=require("dotenv");
const cors=require("cors");

const connectDB=require("./Config/DBConfig");

const authRouter=require("./Routes/authRoute")
const appoRouter=require("./Routes/appointmentRoute")
const messageRouter=require("./Routes/messageRoute")
const doctorRouter=require("./Routes/doctorsRoute");

dotenv.config();
const app=express();
const _dirname=path.resolve();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(_dirname, 'uploads')));
//Routes
app.use("/api/auth",authRouter);
app.use("/api/user",appoRouter);
app.use("/api/user",messageRouter);
app.use("/api/admin",doctorRouter);

app.use(express.static(path.join(_dirname,"/Frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
})

const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    connectDB();
})