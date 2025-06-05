import handleError from "../helpers/handleError.js";
import Category from "../models/category.model.js";

export async function addCategory(req, res, next) {
  const { name, slug } = req.body;
  try {
    const newCategory = new Category({
      name,
      slug,
    });

    await newCategory.save();

    return res.status(200).json({
      success: true,
      message: "Category added successfully",
      category:newCategory
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.find({});

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function getCategory(req, res, next) {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      next(handleError(404, "Category not found"));
    }
    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function updateCategory(req, res, next) {
  const { name, slug } = req.body;
  const { categoryId } = req.params;
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, slug },
      { new: true }
    );

    if (!updateCategory) {
      next(handleError(404, "Category not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category:updateCategory
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function deleteCategory(req, res, next) {
    const { categoryId } = req.params;
    
  try {
    const category=await Category.findByIdAndDelete(categoryId);

    if (!category) {
        next(handleError(404, "Category not found"));
    }

    return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        category
      });
  } catch (error) {
    next(handleError(500, error.message));
  }
}
