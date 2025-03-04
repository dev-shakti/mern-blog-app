import express from "express"
import { login, logout, register, updateProfile} from "../controller/user.controller.js"
import upload from "../helpers/multer.js"

const router=express.Router()


router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.put("/:userId/profile-update",upload.single("file"), updateProfile)

export default router