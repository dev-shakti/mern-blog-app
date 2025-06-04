import handleError from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

export async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      next(handleError(400, "User already exist with this email"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createNewUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await createNewUser.save();

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      next(handleError(404, "Email or password is not valid"));
    }

    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordMatch) {
      next(handleError(404, "Email or password is not valid"));
    }

    const token = jwt.sign(
      {
        _id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    const user = {
      _id: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
    };

    res.cookie("access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function logout(req, res, next) {
  try {
    res.cookie("access-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function updateProfile(req, res, next) {
  const userId = req.params.userId;

  if (!userId) {
    next(handleError(404, "User ID is missing "));
  }
  const data = JSON.parse(req.body.data);
  console.log(data);
  

  try {
    const user = await User.findById(userId);
    if (!user) {
      next(handleError(404, "User not found"));
    }

    user.name = data?.name;
    user.email = data?.email;
    user.bio = data?.bio;

    if (data?.password && data?.password?.length >= 6) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      user.password = hashedPassword;
    }

    //Upload an image
    if(req.file){
      user.profileImage=req.file.path;
    }

    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(handleError(404, error.message));
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}
