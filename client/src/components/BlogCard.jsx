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
     <Card className="bg-muted/30 rounded-lg shadow-md hover:shadow-xl hover:scale-105  min-h-[400px] flex flex-col  transition-all ease-in-out duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {blog?.author?.profileImage ? (
              <img src={blog.author.profileImage} alt="author-image" className="w-10 h-10 rounded-full object-cover"/>
            ) : (
              <Avatar>
                <AvatarImage src="https://ui-avatars.com/api/?name=S+S+Das&background=random" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <h4 className="text-foreground">{blog?.author?.name}</h4>
              <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
            </div>
          </div>
          <Button variant={"outline"} size={"icon"} className="rounded-full cursor-pointer">
            <Bookmark className="w-6 h-6"/>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <img
          src={blog?.blogImage || "https://via.placeholder.com/300"}
          alt="blog-image"
          className="object-cover h-[200px] w-full"
        />
      </CardContent>
      <CardFooter className="px-4">
        <h3 className="text-xl font-semibold text-foreground line-clamp-2">{blog?.title}</h3>
      </CardFooter>
    </Card>
    </Link>
   
  );
};

export default BlogCard;
