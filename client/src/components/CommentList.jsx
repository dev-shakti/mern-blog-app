import getEnv from "@/helpers/getEnv";
import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import Loading from "./common/Loading";
import moment from "moment";

const CommentList = ({
  blogData,
  comments,
  setComments,
  refresh,
  setRefresh,
}) => {
  const blogId = blogData?.blog?._id;

  const url = blogId
    ? `${getEnv("VITE_BASE_URL")}/comment/get/${blogId}`
    : null;

  const { loading, data, error } = useFetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    if (data && data?.comments) {
      setComments(data.comments);
    }
  }, [data, setComments]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh, setRefresh]);

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
      <h4 className="font-semibold text-lg text-foreground my-6">
        {comments.length} Comments
      </h4>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="flex items-start gap-3">
            <img
              src={comment.userId.profileImage || "https://ui-avatars.com/api/?name=S+S+Das&background=random"}
              alt="profile-image"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div >
              <h4 className="text-lg font-semibold tracking-tight text-foreground">
                {comment.userId.name}
              </h4>
              <p className="text-sm text-muted-foreground">{comment.comment}</p>
              <p className="text-sm text-muted-foreground mt-3">
                {moment(comment.createdAt).format("DD-MM-YYYY")}
              </p>
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
