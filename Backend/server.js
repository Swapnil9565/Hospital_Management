const express=require("express");
const path=require("path");
const dotenv=require("dotenv");
const cors=require("cors");

const connectDB=require("./Config/DBConfig");

const authRouter=require("./Routes/authRoute")
const userRouter=require("./Routes/userRoute")
const adminRouter=require("./Routes/adminRoute");

dotenv.config();
const app=express();
const _dirname=path.resolve();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5173', 'https://hospital-management-99yz.onrender.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

//Routes
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);

app.use(express.static(path.join(_dirname,"/Frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
})

const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    connectDB();
})