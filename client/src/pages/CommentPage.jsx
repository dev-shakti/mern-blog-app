import CommentListTable from "@/components/CommentListTable";
import Loading from "@/components/common/Loading";
import getEnv from "@/helpers/getEnv";
import showToast from "@/helpers/showToast";
import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";

const CommentPage = () => {
  const {
    data: commentData,
    loading,
    error,
    refetch
  } = useFetch(`${getEnv("VITE_BASE_URL")}/comment/get`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });


  async function handleDelete(currentCommentId) {
    try {
      const response = await fetch(
        `${getEnv("VITE_BASE_URL")}/comment/${currentCommentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
          
      if (!response.ok) {
        showToast("error", data.message);
        return;
      }

      const data = await response.json();
      await refetch();
      console.log(data);
  
      showToast("success", data.message);
    } catch (error) {
      console.error("Registration error:", error.message);
      showToast("error", error.message);
    }
  }


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-xl">Comments Not Found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        All Comments List
      </h1>
      <CommentListTable
        comments={commentData.comments}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CommentPage;
