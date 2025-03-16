import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";


const BlogCard = ({ blog }) => { 
  return (
    <Link  to={`/blog/${blog.category.name}/${blog.slug}`}>
     <Card className="bg-white rounded-lg shadow-md hover:shadow-xl p-4 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {blog?.author?.profileImage ? (
              <img src={blog.author.profileImage} alt="author-image" />
            ) : (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <h4>{blog?.author?.name}</h4>
              <p className="text-xs text-gray-600">Posted 2 days ago</p>
            </div>
          </div>
          <Button variant={"outline"} size={"icon"} className="rounded-full cursor-pointer">
            <Bookmark className="w-6 h-6"/>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <img
          src={blog?.blogImage || "https://via.placeholder.com/300"}
          alt="blog-image"
          className="rounded-md object-cover"
        />
      </CardContent>
      <CardFooter>
        <h3 className="text-xl font-bold text-gray-800">{blog?.title}</h3>
      </CardFooter>
    </Card>
    </Link>
   
  );
};

export default BlogCard;
