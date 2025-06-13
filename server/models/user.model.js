import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:""
    },
    bio:{
        type:String,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        required:true
    }
},{timestamps:true})

const User=mongoose.model('User',userSchema)

export default User