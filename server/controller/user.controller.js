import handleError from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const checkUser = User.findOne({ email });
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
  const { name, email, password } = req.body;
  try {
    const checkUser = User.findOne({ email });
    if (!checkUser) {
      next(handleError(404, "Email or password is not valid"));
    }

    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordMatch) {
      next(handleError(404, "Email or password is not valid"));
    }

    const token = jwt.sign({ userId: checkUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.status(200).json({
        success:true,
        message:"Logged in successfully",
        user:{
            _id:checkUser._id,
            email:checkUser.email,
            role:checkUser.role,
            accessToken:token
        }
    })
  } catch (error) {
    next(handleError(500, error.message));
  }
}
