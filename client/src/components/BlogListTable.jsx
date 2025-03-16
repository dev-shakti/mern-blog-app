import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteIcon, Edit2 } from "lucide-react";
import moment from "moment";
import Loading from "./common/Loading";

const BlogListTable = ({blogs,loading,error,onEdit,onDelete}) => {
  if (loading)
    return <Loading/>;
  if (error)
    return (
      <p className="text-center text-red-500">Failed to load blogs.</p>
    );
  return (
    <Card>
      <CardContent>
        <Table>
          <TableCaption>A list of your blogs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs && blogs.length> 0 ? 
            blogs.map((blog) => (
              <TableRow key={blog?._id}>
              <TableCell>{blog?.title}</TableCell>
              <TableCell>{blog?.author?.name}</TableCell>
              <TableCell>{blog?.category?.name}</TableCell>
              <TableCell>{blog?.slug}</TableCell>
              <TableCell>{moment(blog?.createdAt).format("DD-MM-YYYY")}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <Button
                  onClick={() => onEdit(blog)}
                    variant="outline"
                    className="rounded-full hover:bg-teal-500 hover:text-white cursor-pointer"
                  >
                    <Edit2 className="w-6 h-6 text-gray-700 group-hover:text-white" />
                  </Button>
                  <Button
                   onClick={() => onDelete(blog?._id)}
                    variant="outline"
                    className="rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    <DeleteIcon className="w-6 h-6 text-gray-700 group-hover:text-white" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            ))
            : 
            <TableRow><TableCell>Blogs Not Found</TableCell></TableRow>}
           
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BlogListTable;
