import handleError from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    const checkUser =await User.findOne({ email });
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

    const user={
        _id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
    }

    res.cookie("access-token",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:process.env.NODE_ENV==="production" ? "none" : "strict",
      path:"/"
    })

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}

export async function logout(req, res, next) {
  try {
    res.cookie("access-token",{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:process.env.NODE_ENV==="production" ? "none" : "strict",
      path:"/"
    })
   
    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
}
