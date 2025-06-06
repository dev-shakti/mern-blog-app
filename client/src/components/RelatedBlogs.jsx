import React from "react";
import { Card, CardContent } from "./ui/card";
import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";
import Loading from "./common/Loading";
import { Link } from "react-router-dom";

const RelatedBlogs = ({ categoryId, blogId }) => {
  const url = categoryId
    ? `${getEnv("VITE_BASE_URL")}/blog/get/blog/${categoryId}/${blogId}`
    : null;
  const { data, loading, error } = useFetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-xl">Blogs Not Found</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-violet-500 tracking-tight">
        Related Blogs
      </h2>
      <div className="flex flex-col space-y-4">
        {data && data.blogs && data.blogs.length > 0 ? (
          data.blogs.map((blog) => (
            <Link
              key={blog?._id}
              to={`/blog/${blog.category.name}/${blog.slug}`}
            >
              <Card>
                <CardContent className="">
                  <div className="flex gap-4">
                    <img
                      src={blog?.blogImage}
                      alt="blog-image"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-semibold tracking-tight">
                      {blog?.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-red-500">No related blogs found</p>
        )}
      </div>
    </>
  );
};

export default RelatedBlogs;
