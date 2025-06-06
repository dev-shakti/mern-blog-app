import BlogCard from "@/components/BlogCard";
import Loading from "@/components/common/Loading";
import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";

const Homepage = () => {
  const {
    loading,
    data: blogData,
    error,
  } = useFetch(`${getEnv("VITE_BASE_URL")}/blog/get`, {
    method: "GET",
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
  
  console.log(blogData);
  
  return (
    <div className="p-6">
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

export default Homepage;
