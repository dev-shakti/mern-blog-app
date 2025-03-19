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

    // Populate user details after saving
    const populatedComment = await Comment.findById(newComment._id).populate(
      "userId",
      "name profileImage"
    );

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comment: populatedComment,
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
      totalComments,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function getAllCommentsByAdmin(req, res, next) {
  try {
    // Get all comments
    const comments = await Comment.find({})
      .populate("userId", "name")
      .populate("blogId", "title");

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function deleteComment(req, res, next) {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(commentId)
    
    if (!comment) {
      return next(handleError("404", "Comment not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Comment deleted succesfully",
      comment
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}
