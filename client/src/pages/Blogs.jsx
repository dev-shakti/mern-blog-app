import AddBlogDialog from "@/components/AddBlogDialog";
import BlogListTable from "@/components/BlogListTable";
import { Button } from "@/components/ui/button";
import getEnv from "@/helpers/getEnv";
import showToast from "@/helpers/showToast";
import useCategoryActions from "@/hooks/useCategoryActions";
import useFetch from "@/hooks/useFetch";
// import useBlogDialog from "@/hooks/useBlogDialogActions";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import slugify from "react-slugify";
import { z } from "zod";

const blogFormSchema = z.object({
  title: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  category: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  slug: z.string().min(6, {
    message: "Slug must be at least 3 characters.",
  }),
  content: z.string(),
});

const Blogs = () => {
  const { categories } = useCategoryActions();
  const { loading, data, error,refetch } = useFetch(
    `${getEnv("VITE_BASE_URL")}/blog/get`,{
      method: "GET",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      category: "",
    },
  });

  const { setValue, watch, reset } = form;
  const titleValue = watch("title");

  function handleFile(acceptedFiles) {
    const file = acceptedFiles[0];
    if (file) {
      setImage({
        file, // Store the actual file
        preview: URL.createObjectURL(file), // Store preview URL
      });
    }
  }

  function handleCloseDialog() {
    setOpen(false);
    reset();
    setCurrentEditedId(null);
  }

  async function handleBlogForm(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("category", values.category);
    formData.append("content", values.content);
    formData.append("author", user?._id);
    if (image?.file) {
      formData.append("file", image.file);
    }

    const url = currentEditedId
      ? `${getEnv("VITE_BASE_URL")}/blog/${currentEditedId}/edit`
      : `${getEnv("VITE_BASE_URL")}/blog/add`;
    const method = currentEditedId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      await refetch();     
      setOpen(false);
      setImage(null);
      setCurrentEditedId(null);
      reset();
      showToast("success", data.message);
    } catch (error) {
      console.error("Registration error:", error.message);
      showToast("error", error.message);
    }
  }

  function handleEditBlog(currentBlogItem) {
    if (currentBlogItem) {
      setCurrentEditedId(currentBlogItem?._id);
      setOpen(true);
      setValue("title", currentBlogItem.title);
      setValue("slug", currentBlogItem.slug);
      setValue("category", currentBlogItem.category._id);
      setValue("content", currentBlogItem.content);
    }
  }

  async function handleDeleteBlog(currentBlogId) {
    
    try {
          const response = await fetch(
            `${getEnv("VITE_BASE_URL")}/blog/${currentBlogId}/delete`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const data = await response.json();
    
          if (!response.ok) {
            showToast("error", data.message);
            return;
          }
          await refetch();
          showToast("success", data.message);
        } catch (error) {
          console.error(error.message);
          showToast("error", error.message);
        }
  }

  useEffect(() => {
    if (titleValue) {
      const baseSlug = slugify(titleValue, {
        lower: true,
        strict: true,
        trim: true,
      });

      // Generate a unique part (timestamp or random ID)
      const uniqueSuffix = Date.now().toString().slice(-4);
      const uniqueSlug = `${baseSlug}-${uniqueSuffix}`;

      setValue("slug", uniqueSlug);
    }
  }, [titleValue, setValue]);


  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setOpen(true)}
          className="bg-violet-500 hover:bg-violet-600 text-foreground cursor-pointer"
        >
          Add Blog
        </Button>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6">
        All Blog Lists
      </h1>
      <BlogListTable
        blogs={data.blogs || []}
        loading={loading}
        error={error}
        onEdit={handleEditBlog}
        onDelete={handleDeleteBlog}
      />
      {open && (
        <AddBlogDialog
          form={form}
          open={open}
          onClose={handleCloseDialog}
          image={image}
          handleFile={handleFile}
          handleBlogForm={handleBlogForm}
          categories={categories}
          currentEditedId={currentEditedId}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Blogs;
