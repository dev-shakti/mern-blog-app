import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const BlogCard = ({ blog }) => {
 

  return (
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
          <Badge className="bg-violet-500 hover:bg-violet-600 text-white px-3 py-1 rounded-full">
            {blog?.author?.role}
          </Badge>
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
  );
};

export default BlogCard;
