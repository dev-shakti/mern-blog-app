import handleError from "../helpers/handleError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticate(req, res, next) {
  const token = req.cookies?.token; // ✅ Get token from cookies

  if (!token) {
    return next(handleError(401, "Access denied. No token provided."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // ✅ Attach decoded user data to request object
    next(); // ✅ Proceed to next middleware
  } catch (error) {
    return next(handleError(403, "Invalid or expired token."));
  }
}
