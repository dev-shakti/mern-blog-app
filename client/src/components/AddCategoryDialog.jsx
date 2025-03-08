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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddCategoryDialog = ({ openCategoryDialog, onClose,form,handleCategoryForm}) => {

  return (
    <Dialog open={openCategoryDialog} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="mb-6 text-lg">
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
        
            <form onSubmit={form.handleSubmit(handleCategoryForm)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
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
                Add Category
              </Button>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
