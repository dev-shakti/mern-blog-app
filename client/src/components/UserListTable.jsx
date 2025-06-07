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

const UserListTable = ({ users, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Dated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user?._id}>
                  <TableCell className="font-medium">{user?.role}</TableCell>
                  <TableCell className="font-medium">{user?.name}</TableCell>
                  <TableCell className="font-medium">{user?.email}</TableCell>
                  <TableCell className="font-medium">
                    <img
                      src={user.profileImage || "https://ui-avatars.com/api/?name=S+S+Das&background=random"}
                      alt="user-profileImage"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {moment(user?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => onDelete(user?._id)}
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
                <TableCell>Users not found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserListTable;
