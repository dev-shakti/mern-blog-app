import express from "express"
import { 
    addCategory, 
    deleteCategory, 
    getAllCategories, 
    getCategory, 
    updateCategory 
} from "../controller/category.controller.js"
const categoryRoute=express.Router()
import { onlyAdmin } from "../middleware/onlyAdmin.js"

categoryRoute.post("/add",onlyAdmin,addCategory)
categoryRoute.get("/get",getAllCategories)
categoryRoute.get("/:categoryId",getCategory)
categoryRoute.put("/:categoryId/update",onlyAdmin, updateCategory)
categoryRoute.delete("/:categoryId/delete",onlyAdmin, deleteCategory)

export default categoryRoute