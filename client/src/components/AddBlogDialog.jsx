import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AddBlogDialog = ({openBlogDialog,onClose,currentEditedId,form,handleBlogForm}) => {
  return (
    <Dialog open={openBlogDialog} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader className="mb-6 text-lg">
        <DialogTitle>
          {currentEditedId ? "Edit Blog" : "Add Blog"}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleBlogForm)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 cursor-pointer w-full"
          >
            {currentEditedId ? "Save changes" : "Add Blog"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
  )
}

export default AddBlogDialog
