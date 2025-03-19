import React from "react";
import { Card, CardContent } from "./ui/card";
import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";

const RelatedBlogs = ({ categoryId, blogId }) => {
  const url = categoryId
    ? `${getEnv("VITE_BASE_URL")}/blog/get/blog/${categoryId}/${blogId}`
    : null;
  const { data } = useFetch(url,{
    method: "GET",
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },
  });


  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-violet-500 tracking-tight">Related Blogs</h2>
      <div className="flex flex-col space-y-4">
        {data && data.blogs && data.blogs.length > 0 ? (
          data.blogs.map((blog) => (
            <Card key={blog?._id}>
              <CardContent className="">
                <div className="flex gap-4">
                  <img
                    src={blog?.blogImage}
                    alt="blog-image"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold tracking-tight">{blog?.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-red-500">No related blogs found</p>
        )}
      </div>
    </>
  );
};

export default RelatedBlogs;
