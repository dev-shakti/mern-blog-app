import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "./common/Loading";
import BlogCard from "./BlogCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_BASE_URL")}/blog/search?q=${query}`,{
    method: "GET",
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },
  },);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-xl">Blogs Not Found</p>;
  }


  return (
    <div className="p-6">
      {blogData && blogData.blogs && blogData.blogs.length > 0 && (
        <div className="flex flex-col space-y-4 mb-6">
           <h2 className="text-xl font-semibold">Search Results For <span className="text-violet-500">{query}</span></h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogData && blogData.blogs && blogData.blogs.length > 0 ? (
          blogData.blogs.map((blog) => <BlogCard key={blog?._id} blog={blog} />)
        ) : (
          <p className="text-xl font-semibold ">No Blogs Found For <span className="text-violet-500">{query}</span></p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
