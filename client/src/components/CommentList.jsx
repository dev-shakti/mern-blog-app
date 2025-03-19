import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import Loading from "./common/Loading";
import moment from "moment";

const CommentList = ({ blogData, refresh, setRefresh }) => {
  const blogId = blogData?.blog?._id;

  const url = blogId ? `${getEnv("VITE_BASE_URL")}/comment/get/${blogId}` : null;
  
  const { loading, data, error, refetch } = useFetch(url,{
    method: "GET",
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (data && data?.comments) {
      setComments(data.comments);
    }
  }, [data]);

  useEffect(() => {
    if (refresh) {
      refetch();
      setRefresh(false);
    }
  }, [refresh, refetch,setRefresh]);

  if (!blogId) {
    return <p>Loading blog data...</p>;
  }


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-xl">Something went wrong</p>;
  }

  return (
    <>
      <h4 className="font-bold text-lg text-gray-700 my-6">
        {data?.totalComments ?? 0} Comments
      </h4>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-3">
            <img
              src={comment.userId.profileImage || "NA"}
              alt="profile-image"
              className="w-24 h-24 object-cover rounded-full"
            />
            <div>
              <h4 className="text-lg font-semibold tracking-tight">
                {comment.userId.name}
              </h4>
              <p className="text-sm text-gray-700">{comment.comment}</p>
              <p className="text-sm text-gray-700 mt-3">{moment(comment.createdAt).format("DD-MM-YYYY")}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No comments added.</p>
      )}
    </>
  );
};

export default CommentList;
