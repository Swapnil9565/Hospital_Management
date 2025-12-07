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
app.use(cors({
  origin: ["http://localhost:5173","https://hospital-management-0oww.onrender.com"], 
  methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
  credentials: true,
   allowedHeaders: ["Content-Type", "Authorization"],
}
));

//Routes
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/admin",adminRouter);

const port=process.env.PORT||5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("DB connection failed ❌", err);
    process.exit(1); 
  }
};

startServer();
