import BlogCard from "@/components/BlogCard";
import Loading from "@/components/common/Loading";
import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";

const Homepage = () => {
  const {
    loading,
    data: blogData,
    error,
  } = useFetch(`${getEnv("VITE_BASE_URL")}/blog/get`);

  if(loading){
    return <Loading/>
  }

  if(error){
    return <p className="text-red-500 text-xl">Blogs Not Found</p>
  }
 
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogData && blogData.blogs && blogData.blogs.length > 0
          ? blogData.blogs.map((blog) => <BlogCard key={blog?._id} blog={blog} />)
          : null}
      </div>
    </div>
  );
};

export default Homepage;
