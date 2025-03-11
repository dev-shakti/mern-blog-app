import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "mern-blog-app", // Folder in Cloudinary
      public_id: file.originalname.split(".")[0], // Use file name as public_id
      resource_type: "image", // Explicitly set resource type
      format: file.mimetype.split("/")[1], // Automatically get format
    };
  },
});

const upload = multer({ storage });

export default upload;
