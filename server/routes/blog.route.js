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

const blogRoute = express.Router();

blogRoute.post("/add",upload.single("file"), createBlog);
blogRoute.get("/get", getAllBlogs);
blogRoute.get("/get/:slug", getBlogBySlug);
blogRoute.put("/:blogId/edit",upload.single("file"), editBlog);
blogRoute.delete("/:blogId/delete", deleteBlog);
blogRoute.get("/get/blog/:categoryId/:blogId", RelatedBlogs);
blogRoute.get("/get/blog/:categoryId", FilterBlogsByCategory);
blogRoute.get("/search", searchBlogs);


export default blogRoute