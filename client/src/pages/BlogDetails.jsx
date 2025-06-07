import Loading from "@/components/common/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Comments from "@/components/Comments";
import LikeCount from "@/components/LikeCount";
import RelatedBlogs from "@/components/RelatedBlogs";

const BlogDetails = () => {
  const { slug } = useParams();

  const {
    loading,
    data: blogData,
    error,
  } = useFetch(
    slug ? `${getEnv("VITE_BASE_URL")}/blog/get/${slug}` : null,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
    [slug]
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-xl">Blogs Not Found</p>;
  }

  return (
    <section className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[70%]">
          <Card className="bg-muted/30 rounded-lg shadow-md hover:shadow-xl w-full max-w-5xl mx-auto">
            <div className="p-4 lg:px-8">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  {blogData?.blog?.author?.profileImage ? (
                    <img
                      src={blogData.blog.author.profileImage}
                      alt="profile-image"
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar>
                      <AvatarImage src="https://ui-avatars.com/api/?name=S+S+Das&background=random" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-lg lg:text-2xl text-foreground font-bold tracking-tight">
                      {blogData?.blog?.author?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                  </div>
                </div>
                  <LikeCount blogId={blogData?.blog?._id} />             
              </div>
              <h2 className="text-2xl font-bold mt-6 text-foreground">
                {blogData?.blog?.title}
              </h2>
              <div className="w-full my-6">
                <img
                  src={blogData?.blog?.blogImage}
                  alt="blog-image"
                  className="h-64 md:80 lg:h-96 w-full rounded-md object-cover"
                />
              </div>

              <p className="text-muted-foreground tracking-normal leading-wide">
                {blogData?.blog?.content}
              </p>
              <Separator className="my-6" />
              <h4 className="text-xl font-bold text-foreground tracking-tight mb-4">
                Post Comments
              </h4>
              <Comments blogData={blogData} />
            </div>
          </Card>
        </div>
        <div className="w-full md:w-[30%] mt-6 md:mt-0">
          <RelatedBlogs
            categoryId={blogData?.blog?.category?._id}
            blogId={blogData?.blog?._id}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
