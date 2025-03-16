import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";
import { HeartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import showToast from "@/helpers/showToast";
import { useSelector } from "react-redux";

const LikeCount = ({ blogId }) => {
  const { user } = useSelector((state) => state.auth);
  const [likeCount, setLikeCount] = useState(0);

  
 // const { data } = useFetch(`${getEnv("VITE_BASE_URL")}/like/get/${blogId}`);
 const url = blogId ? `${getEnv("VITE_BASE_URL")}/like/get/${blogId}` : null;
 console.log("Fetching from URL:", url);
 const { data } = useFetch(url);

 
  useEffect(() => {
     if(data?.likeCount){
        setLikeCount(data.likeCount)
     }
  },[data])

  async function handleLike() {
    if (!user && !user?.isLoggedIn) {
      showToast("error", "You must signin to like the blog post");
      return;
    }

    try {
      const response = await fetch(`${getEnv("VITE_BASE_URL")}/like/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: true,
        },
        body: JSON.stringify({ userId: user?._id, blogId: blogId }),
      });

      if (!response.ok) {
        showToast("error", data.message);
        return;
      }
      const data = await response.json();
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error("Registration error:", error.message);
      showToast("error", error.message);
    }
  }

  return (
    <Button
      onClick={handleLike}
      variant="outline"
      className="flex items-center gap-1 cursor-pointer"
    >
      <HeartIcon className="w-6 h-6" />
      <span>{likeCount}</span>
    </Button>
  );
};

export default LikeCount;
