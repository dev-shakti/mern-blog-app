import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlogById,
} from "../controller/blog.controller.js";
import upload from "../config/cloudinary.js";

const blogRoute = express.Router();

blogRoute.post("/add",upload.single("file"), createBlog);
blogRoute.get("/get", getAllBlogs);
blogRoute.get("/:blogId", getBlogById);
blogRoute.put("/:blogId/edit",upload.single("file"), editBlog);
blogRoute.delete("/:blogId/delete", deleteBlog);


export default blogRoute