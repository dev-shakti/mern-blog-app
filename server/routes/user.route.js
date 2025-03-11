import express from "express"
import { login, logout, register, updateProfile} from "../controller/user.controller.js"

const router=express.Router()


router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.put("/:userId/profile-update", updateProfile)

export default router