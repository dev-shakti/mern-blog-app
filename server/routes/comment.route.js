import express from "express";
import {
  addComment,
  deleteComment,
  getAllComments,
  getComments,
} from "../controller/comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const commentRoute = express.Router();

commentRoute.post("/add", authenticate, addComment);
commentRoute.get("/get/:blogId", getComments);
commentRoute.get("/get",authenticate, getAllComments);
commentRoute.delete("/:commentId", deleteComment);

export default commentRoute;
