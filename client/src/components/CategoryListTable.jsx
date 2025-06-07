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

const CategoryListTable = ({ categories, loading, error,onEdit,onDelete }) => {
  if (loading)
    return <Loading/>;
  if (error)
    return (
      <p className="text-center text-red-500">Failed to load categories.</p>
    );
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <TableRow key={cat?._id}>
                  <TableCell className="font-medium">{cat?.name}</TableCell>
                  <TableCell>{cat?.slug}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button
                      onClick={() => onEdit(cat)}
                        variant="outline"
                        className="rounded-full hover:bg-teal-500 hover:text-white cursor-pointer"
                      >
                        <Edit2 className="w-6 h-6 text-gray-700 group-hover:text-white" />
                      </Button>
                      <Button
                      onClick={() => onDelete(cat._id)}
                        variant="outline"
                        className="rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
                      >
                        <DeleteIcon className="w-6 h-6 text-gray-700 group-hover:text-white" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Categories not found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategoryListTable;
