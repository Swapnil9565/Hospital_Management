const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");

const connectDB=require("./Config/DBConfig");

const authRouter=require("./Routes/authRoute")
const userRouter=require("./Routes/userRoute")
const adminRouter=require("./Routes/adminRoute");

dotenv.config();
const app=express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);

const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    connectDB();
})