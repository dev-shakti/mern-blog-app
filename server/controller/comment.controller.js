import Comment from "../models/comment.model.js";
import handleError from "../helpers/handleError.js";
import mongoose from "mongoose";

export async function addComment(req, res, next) {
  const { blogId, userId, comment } = req.body;

  try {
    const newComment = new Comment({
      blogId,
      userId,
      comment,
    });

    await newComment.save();

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function getComments(req, res, next) {
  const { blogId } = req.params;

  try {
    // Validate and convert blogId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return next(handleError(400, "Invalid Blog ID"));
    }

    // Get total comment count
    const totalComments = await Comment.countDocuments({ blogId });

    // Get all comments
    const comments = await Comment.find({ blogId }).populate(
      "userId",
      "name profileImage"
    );
  
    return res.status(200).json({
      success: true,
      comments,
      totalComments
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}
