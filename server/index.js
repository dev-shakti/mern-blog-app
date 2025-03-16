import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectToDB from "./db/db.js";
import authRoute from "./routes/user.route.js"
import categoryRoute from "./routes/category.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import likeRoute from "./routes/like.route.js";

dotenv.config();

//initial app
const app = express();

ConnectToDB()

//Loading port from env file
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}))


app.use("/api/auth",authRoute)
app.use("/api/category",categoryRoute)
app.use("/api/blog",blogRoute)
app.use("/api/comment",commentRoute)
app.use("/api/like",likeRoute)

//listening to app
app.listen(PORT, () => {
  console.log(`App is running at port: ${PORT}`);
});

//middleware for error handling
app.use((error,req,res,next) => {
   const statusCode=error.statusCode || 500;
   const message=error.message || "Internal server error";
   res.status(statusCode).json({
    success:false,
    message,
    statusCode
   })
})