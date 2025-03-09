import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  });
export default function useBlogDialog() {
    const [open,setOpen] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);

      const form = useForm({
        resolver: zodResolver(blogFormSchema),
        defaultValues: {
          name: "",
          slug: "",
          category:""
        },
      });

      const { setValue, watch,reset} = form;
      const titleValue = watch("title");

      function openDialog() {
        // if (blog) {
        //   setCurrentEditedId(blog._id);
        //   setValue("name", category.name);
        //   setValue("slug", category.slug);
        // }
        setOpen(true);
      }
    

      function closeDialog() {
        setOpen(false);
        setCurrentEditedId(null);
        reset()
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

      return { open, currentEditedId, form, openDialog, closeDialog };
}