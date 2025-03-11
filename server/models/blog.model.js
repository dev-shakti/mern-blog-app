import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    blogImage:{
        type:String,
        default:""
    }
},{timestamps:true})

const Blog=mongoose.model('Blog',blogSchema)

export default Blog