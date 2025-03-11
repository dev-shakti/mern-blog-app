import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Dropzone from "react-dropzone";

const AddBlogDialog = ({
  open,
  onClose,
  form,
  handleBlogForm,
  handleFile,
  image,
  categories,
}) => {
  console.log(categories);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Add Blog</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleBlogForm)}
            className="space-y-4"
          >
            {/* Category Input */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories &&
                          categories.length > 0 &&
                          categories.map((cat) => (
                            <SelectItem value={cat?._id} key={cat?._id}>
                              {cat?.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug Input */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <div className="space-y-2">
              <FormLabel className="text-lg font-medium">
                Upload Image
              </FormLabel>
              <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      {...getRootProps()}
                      className="flex justify-center items-center w-40 h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-violet-500 transition-all"
                    >
                      <input {...getInputProps()} />
                      {image?.preview ? (
                        <img
                          src={image?.preview}
                          alt="Uploaded Preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <p className="text-gray-400 text-sm text-center px-2">
                          Drag & Drop or Click to Upload
                        </p>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>

            {/* Content Textarea */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your content here..."
                      {...field}
                      className="w-full min-h-[150px] max-h-[400px] overflow-y-auto resize-none p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 text-base leading-relaxed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 cursor-pointer w-full py-2 text-lg font-medium"
            >
              Add Blog
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogDialog;
