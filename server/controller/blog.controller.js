import Blog from "../models/blog.model.js";
import handleError from "../helpers/handleError.js";

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
    
    // Populate category and author before sending the response
    // const populatedBlog = await Blog.findById(createNewBlog._id)
    //   .populate("category", "name")
    //   .populate("author", "name");

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

export async function getBlogById(req, res, next) {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
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

    // const updatedBlog = await Blog.findById(blogId)
    //   .populate("category", "name")
    //   .populate("author", "name");

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
