import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectToDB from "./db/db.js";
dotenv.config();

//initial app
const app = express();

ConnectToDB()

//Loading port from env file
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());
//shakti20k
//HEmDZMWjcc4OFKCV
//listening to app
app.listen(PORT, () => {
  console.log(`App is running at port: ${PORT}`);
});
