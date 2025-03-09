import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { z } from "zod";

const categoryFormSchema = z.object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    slug: z.string().min(6, {
      message: "Slug must be at least 3 characters.",
    }),
  });
export default function useCategoryDialog() {
    const [open,setOpen] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);

      const form = useForm({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
          name: "",
          slug: "",
        },
      });

      const { setValue, watch,reset} = form;
      const nameValue = watch("name");

      function openDialog(category) {
        if (category) {
          setCurrentEditedId(category._id);
          setValue("name", category.name);
          setValue("slug", category.slug);
        }
        setOpen(true);
      }
    

      function closeDialog() {
        setOpen(false);
        setCurrentEditedId(null);
        reset()
      }

      useEffect(() => {
        if (nameValue) {
          const baseSlug = slugify(nameValue, {
            lower: true,
            strict: true,
            trim: true,
          });
    
          // Generate a unique part (timestamp or random ID)
          const uniqueSuffix = Date.now().toString().slice(-4); 
          const uniqueSlug = `${baseSlug}-${uniqueSuffix}`;
    
          setValue("slug", uniqueSlug);
        }
      }, [nameValue, setValue]);

      return { open, currentEditedId, form, openDialog, closeDialog };
}