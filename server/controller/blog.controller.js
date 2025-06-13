import Blog from "../models/blog.model.js";
import handleError from "../helpers/handleError.js";
import Category from "../models/category.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function createBlog(req, res, next) {
  const { title, slug, category, content, author } = req.body;

  const blogImage = req.file ? req.file.path : ""; // Get the uploaded image URL

  try {
    const createNewBlog = new Blog({
      title,
      slug,
      content,
      category,
      author,
      blogImage,
    });

    await createNewBlog.save();

    return res.status(201).json({
      blog: createNewBlog,
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function getAllBlogs(req, res, next) {
  let user = null;

  const token = req.cookies?.["access-token"];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = decoded;
    } catch (error) {
      return next(handleError(403, "Invalid or expired token."));
    }
  }
  
  let blogs;
  try {
    if (user && user.role === "user") {
      blogs = await Blog.find({ author: user._id })
        .populate("author", "name role profileImage")
        .populate("category", "name")
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order (newest first)
        .lean();
    } else {     
      blogs = await Blog.find()
        .populate("author", "name role profileImage")
        .populate("category", "name")
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order (newest first)
        .lean();
    }

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function getBlogBySlug(req, res, next) {
  const { slug } = req.params;

  if (!slug) {
    return next(handleError(400, "Slug is required"));
  }

  try {
    const blog = await Blog.findOne({ slug })
      .populate("author", "name role profileImage")
      .populate("category", "name")
      .lean();

    if (!blog) {
      return next(handleError(404, "Blog not found"));
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function editBlog(req, res, next) {
  const { blogId } = req.params;
  const { title, slug, category, content } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return next(handleError(404, "Blog not found"));
    }

    // Update fields only if new values are provided
    if (title) blog.title = title;
    if (slug) blog.slug = slug;
    if (category) blog.category = category;
    if (content) blog.content = content;

    // Handle new blog image if uploaded
    if (req.file) {
      blog.blogImage = req.file.path;
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function deleteBlog(req, res, next) {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(blogId);

    if (!blog) {
      return next(handleError(404, "Blog not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function RelatedBlogs(req, res, next) {
  const { categoryId, blogId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return next(handleError(404, "Category not found"));
    }

    const relatedBlogs = await Blog.find({
      category: category,
      _id: { $ne: blogId },
    }).populate("category","name")

    return res.status(200).json({
      success: true,
      blogs: relatedBlogs,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function FilterBlogsByCategory(req, res, next) {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return next(handleError(404, "Category not found"));
    }

    const blogs = await Blog.find({
      category: category,
    })
      .populate("author", "name role profileImage")
      .populate("category", "name")
      .lean();

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function searchBlogs(req, res, next) {
  const { q } = req.query;

  try {
    if (!q) {
      return res
        .status(400)
        .json({ success: false, message: "Search query is required" });
    }

    const blogs = await Blog.find({ title: { $regex: q, $options: "i" } })
      .populate("author", "name role profileImage")
      .populate("category", "name")
      .lean();

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}
