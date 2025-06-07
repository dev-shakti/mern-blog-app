import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Card, CardContent } from "@/components/ui/card";
  import { DeleteIcon, Edit2 } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import Loading from "./common/Loading";
  import moment from "moment";
  
  const CommentListTable = ({ comments,onDelete }) => {
    return (
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Blog Title</TableHead>
                <TableHead>Comment</TableHead>
            
                <TableHead>Dated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <TableRow key={comment?._id}>
                    <TableCell className="font-medium">{comment?.userId?.name}</TableCell>
                    <TableCell className="font-medium">{comment?.blogId?.title}</TableCell>
                    <TableCell className="font-medium">{comment?.comment}</TableCell>
                    <TableCell className="font-medium">
                      {moment(comment?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                      onClick={() => onDelete(comment?._id)}
                        variant="outline"
                        className="rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
                      >
                        <DeleteIcon className="w-6 h-6 text-gray-700 group-hover:text-white" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>Comments not found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };
  
  export default CommentListTable;
  