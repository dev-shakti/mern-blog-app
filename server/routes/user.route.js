import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { onlyAdmin } from "../middleware/onlyAdmin.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout);
router.put("/:userId/profile-update", authenticate, updateProfile);
router.get("/all-users", onlyAdmin, getAllUsers);
router.delete("/:id/delete", onlyAdmin, deleteUser);

export default router;
