import handleError from "../helpers/handleError.js";
import Like from "../models/like.model.js";
import mongoose from "mongoose";

export async function addLike(req, res, next) {
  const { blogId, userId } = req.body;
  let like;
  try {
    like = await Like.findOne({ blogId, userId });

    if (!like) {
      const addLike = new Like({
        blogId,
        userId,
      });

      await addLike.save();
    } else {
      await Like.findByIdAndDelete(like._id);
    }

    const likeCount = await Like.countDocuments({ blogId });

    return res.status(200).json({
      success: true,
      likeCount,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function likeCount(req, res, next) {
  const { blogId } = req.params;
  
  console.log("Received blogId:", blogId, "Type:", typeof blogId);

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return next(handleError(400, `Invalid Blog ID: ${blogId}`));
  }

  try {
 
    const likeCount = await Like.countDocuments({ blogId });

    return res.status(200).json({
      success: true,
      likeCount,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}
