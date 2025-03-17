import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import Loading from "./common/Loading";
import { Boxes } from "lucide-react";

const FilterBlogs = () => {
  const { categoryId,categoryName } = useParams();

  const url = categoryId
    ? `${getEnv("VITE_BASE_URL")}/blog/get/blog/${categoryId}`
    : null;
  const { data: blogData, loading, error } = useFetch(url, {}, [categoryId]);



  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-xl">Blogs Not Found</p>;
  }


  return (
    <div className="p-6"> 
    {blogData && blogData.blogs && blogData.blogs.length > 0 && <div className="flex flex-col space-y-4 mb-6">
        <span className="flex items-center gap-2 text-2xl font-semibold text-violet-500">
          <Boxes className="w-4 h-4" />
          Category
        </span>
        <h2  className="text-xl font-semibold ">All Blogs related to: <span className="text-violet-500">{categoryName}</span></h2>
      </div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogData && blogData.blogs && blogData.blogs.length > 0 ? (
          blogData.blogs.map((blog) => <BlogCard key={blog?._id} blog={blog} />)
        ) : (
          <p className="text-xl font-semibold text-red-500">No Blogs Found</p>
        )}
      </div>
    </div>
  );
};

export default FilterBlogs;
