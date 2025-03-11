import Blog from "../models/blog.model.js";
import handleError from "../helpers/handleError.js";

export async function createBlog(req,res,next) {

  const { title, slug, category, content, author } =req.body ;

  
  const blogImage = req.file ? req.file.path : ""; // Get the uploaded image URL

  try {
    const createNewBlog = new Blog({
      title,
      slug,
      content,
      category,
      author,
      blogImage
    });

    await createNewBlog.save();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function getAllBlogs(req,res,next) {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .populate("category", "name");

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function getBlogById(req,res,next) {
  const { blogId } = req.params;
  
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      next(handleError(404, "Blog not found"));
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

export async function editBlog(req,res,next) {
    const { blogId } = req.params;
  try {
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}

export async function deleteBlog(req,res,next) {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      next(handleError(404, "Blog not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
}
