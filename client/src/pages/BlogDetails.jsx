import Loading from "@/components/common/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { slug } = useParams();
  console.log(slug);

  const {
    loading,
    data: blogData,
    error,
  } = useFetch(`${getEnv("VITE_BASE_URL")}/blog/get/${slug}`);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-xl">Blogs Not Found</p>;
  }

  return (
    <section className="p-6">
      <Card className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 w-full max-w-5xl mx-auto">
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              {blogData?.blog?.author?.profileImage ? (
                <img
                  src={blogData.blog.author.profileImage}
                  alt="profile-image"
                />
              ) : (
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold tracking-tight">
                  {blogData?.blog?.author?.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Posted 2 days ago</p>
              </div>
            </div>
            <div>right</div>
          </div>
          <h2 className="text-2xl font-bold mt-6">{blogData?.blog?.title}</h2>
          <div className="w-full h-96 my-6">
            <img
              src={blogData?.blog?.blogImage}
              alt="blog-image"
              className="rounded-md object-cover w-full h-full"
            />
          </div>

          <p className="text-gray-700 tracking-normal leading-wide">
            {blogData?.blog?.content}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default BlogDetails;
