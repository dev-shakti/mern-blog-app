import express from "express";
import { addLike, likeCount } from "../controller/like.controller.js";


const likeRoute= express.Router();

likeRoute.post("/add", addLike);
likeRoute.get("/get/:blogId", likeCount);

export default likeRoute;