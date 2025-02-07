const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");
const authRouter=require("./Routes/authRoute")
const appoRouter=require("./Routes/appointmentRoute")

dotenv.config();
const app=express();
const _dirname=path.resolve();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use("/api/auth",authRouter);
app.use("/api/user",appoRouter);

app.use(express.static(path.join(_dirname,"/Frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
})

const port=process.env.PORT||5000;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); 
    }
};
connectDB();

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})