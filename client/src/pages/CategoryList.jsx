import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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
import AddCategoryDialog from "@/components/AddCategoryDialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import showToast from "@/helpers/showToast";
import getEnv from "@/helpers/getEnv";

const categoryFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  slug: z.string().min(6, {
    message: "Slug must be at least 3 characters.",
  }),
});
const CategoryList = () => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  function handleClose() {
    setOpenCategoryDialog(false);
  }

  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  async function handleCategoryForm(values) {
    //api call
    console.log(values);
    
    try {
      const response = await fetch(`${getEnv("VITE_BASE_URL")}/category/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: true,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      showToast("success", data.message);
    } catch (error) {
      console.error(error.message);
      showToast("error", error.message);
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setOpenCategoryDialog(true)}
          className="bg-violet-500 hover:bg-violet-600 cursor-pointer"
        >
          Add Category
        </Button>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6">
        All Categories
      </h1>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>A list of your categories.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Category Name</TableCell>
                <TableCell>Slug</TableCell>
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
      {openCategoryDialog && (
        <AddCategoryDialog
          openCategoryDialog={openCategoryDialog}
          onClose={handleClose}
          form={form}
          handleCategoryForm={handleCategoryForm}
        />
      )}
    </div>
  );
};

export default CategoryList;
