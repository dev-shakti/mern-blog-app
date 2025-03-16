import express from "express";
import { addComment, getComments } from "../controller/comment.controller.js";

const commentRoute = express.Router();

commentRoute.post("/add", addComment);
commentRoute.get("/get/:blogId", getComments);

export default commentRoute;
