import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  FilterBlogsByCategory,
  getAllBlogs,
  getBlogBySlug,
  RelatedBlogs,
  searchBlogs,
} from "../controller/blog.controller.js";
import upload from "../config/cloudinary.js";
import { authenticate } from "../middleware/authenticate.js"
const blogRoute = express.Router();

blogRoute.post("/add",authenticate,upload.single("file"), createBlog);
blogRoute.get("/get",getAllBlogs);
blogRoute.get("/get/:slug", getBlogBySlug);
blogRoute.put("/:blogId/edit",authenticate, upload.single("file"), editBlog);
blogRoute.delete("/:blogId/delete",authenticate, deleteBlog);
blogRoute.get("/get/blog/:categoryId/:blogId",authenticate, RelatedBlogs);
blogRoute.get("/get/blog/:categoryId", FilterBlogsByCategory);
blogRoute.get("/search", searchBlogs);


export default blogRoute