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

const BlogListTable = () => {
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
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <Button
                    variant="outline"
                    className="rounded-full hover:bg-teal-500 hover:text-white cursor-pointer"
                  >
                    <Edit2 className="w-6 h-6 text-gray-700 group-hover:text-white" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    <DeleteIcon className="w-6 h-6 text-gray-700 group-hover:text-white" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BlogListTable;
