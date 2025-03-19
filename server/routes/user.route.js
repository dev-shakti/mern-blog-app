import express from "express"
import { getAllUsers, login, logout, register, updateProfile} from "../controller/user.controller.js"

const router=express.Router()


router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.put("/:userId/profile-update", updateProfile)
router.get("/all-users",getAllUsers)

export default router