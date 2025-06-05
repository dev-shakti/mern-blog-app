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
import { Loader2 } from "lucide-react";

const AddBlogDialog = ({
  open,
  onClose,
  form,
  handleBlogForm,
  handleFile,
  image,
  categories,
  currentEditedId,
  loading,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {currentEditedId ? "Edit" : "Add"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleBlogForm)}
            className="space-y-4 grid grid-cols-2"
          >
            {/* Category Input */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue defaultValue={field.value}>
                            {categories.find((cat) => cat._id === field.value)
                              ?.name || "Select Category"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {categories &&
                            categories.length > 0 &&
                            categories.map((cat) => (
                              <SelectItem value={cat._id} key={cat._id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
                <FormItem className="col-span-2">
                  <FormLabel className="text-lg font-medium">Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} className="col-span-2" />
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
                <FormItem className="col-span-2">
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
              disabled={loading}
              className={`${
                loading ? "cursor-not-allowed bg-gray-300 text-gray-900 " : ""
              }bg-violet-500 col-span-2 hover:bg-violet-600 cursor-pointer w-full py-2 text-lg font-medium `}
            >
             <Loader2 className={`w-4 h-4 ${loading ? "animate-spin block" : "hidden"}`} />
              <span className="ml-2">
                {currentEditedId ? "Save Changes" : "Add"}
              </span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogDialog;
