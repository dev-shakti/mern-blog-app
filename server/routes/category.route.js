import express from "express"
import { 
    addCategory, 
    deleteCategory, 
    getAllCategories, 
    getCategory, 
    updateCategory 
} from "../controller/category.controller.js"
const categoryRoute=express.Router()


categoryRoute.post("/add",addCategory)
categoryRoute.get("/get",getAllCategories)
categoryRoute.get("/:categoryId",getCategory)
categoryRoute.put("/:categoryId/update",updateCategory)
categoryRoute.delete("/:categoryId/delete",deleteCategory)

export default categoryRoute