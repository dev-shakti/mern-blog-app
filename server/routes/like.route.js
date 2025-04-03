import express from "express";
import { addLike, likeCount } from "../controller/like.controller.js";
import { authenticate } from "../middleware/authenticate.js"

const likeRoute= express.Router();

likeRoute.post("/add",authenticate, addLike);
likeRoute.get("/get/:blogId", likeCount);

export default likeRoute;