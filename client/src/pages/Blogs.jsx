import AddBlogDialog from "@/components/AddBlogDialog";
import BlogListTable from "@/components/BlogListTable";
import { Button } from "@/components/ui/button";
import useBlogDialog from "@/hooks/useBlogDialogActions";
import React from "react";

const Blogs = () => {
    const { open, currentEditedId, form, openDialog, closeDialog }=useBlogDialog();
  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-end mb-6">
        <Button onClick={openDialog} className="bg-violet-500 hover:bg-violet-600 cursor-pointer">
          Add Blog
        </Button>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6">
        All Blog Lists
      </h1>
      <BlogListTable />
      {open && <AddBlogDialog 
      currentEditedId={currentEditedId} 
      form={form} 
      openBlogDialog={open}
      onClose={closeDialog}
      />}
    </div>
  );
};

export default Blogs;
