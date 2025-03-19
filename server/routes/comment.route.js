import express from "express";
import {
  addComment,
  deleteComment,
  getAllCommentsByAdmin,
  getComments,
} from "../controller/comment.controller.js";

const commentRoute = express.Router();

commentRoute.post("/add", addComment);
commentRoute.get("/get/:blogId", getComments);
commentRoute.get("/get", getAllCommentsByAdmin);
commentRoute.delete("/:commentId", deleteComment);

export default commentRoute;
