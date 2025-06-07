import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import showToast from "@/helpers/showToast";
import getEnv from "@/helpers/getEnv";
import { useSelector } from "react-redux";
import CommentList from "./CommentList";
import { useState } from "react";

const commentFormSchema = z.object({
  comment: z.string().min(6, {
    message: "Comment must be at least 6 characters.",
  }),
});

const Comments = ({ blogData }) => {
  const { user } = useSelector((state) => state.auth);
  const [refresh, setRefresh] = useState(false);
  const [comments,setComments]=useState([])
  const form = useForm({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    const newValues = {
      ...values,
      blogId: blogData?.blog?._id,
      userId: user?._id,
    };

    if (!user && !user?.isLoggedIn) {
      showToast("error", "You must signin to add comments");
      form.reset();
      return;
    }
    //api call
    try {
      const response = await fetch(`${getEnv("VITE_BASE_URL")}/comment/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(newValues),
      });
      const data = await response.json();

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      showToast("success", data.message);
     setComments([...comments,data.comment])
     setRefresh(true)
     
      setRefresh(true); // Toggle refresh state to trigger re-fetch
    } catch (error) {
      console.error(error.message);
      showToast("error", error.message);
    }
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-lg text-foreground">
                  Comment
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none mt-1 text-muted-foreground"
                    placeholder="Add your comment..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 cursor-pointer text-foreground"
          >
            Submit
          </Button>
        </form>
      </Form>

      <CommentList
        blogData={blogData}
        comments={comments}
        setComments={setComments}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Comments;
