import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../config/fetcher";
import { Comment, Post } from "../types";
import { Spinner } from "@nextui-org/react";

const PostDetail = () => {
  const { userId, postId } = useParams<{ userId: string; postId: string }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    fetcher
  );

  const { data: dataComment, isLoading: isLoadingComment } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    fetcher
  );

  const postData: Post = data;
  const commentData: Comment[] = dataComment;

  if (isLoading || isLoadingComment) return <Spinner className="w-20 h-20" />;
  if (!postData?.id) return <div>no data</div>;

  // render data
  return (
    <div className="py-8">
      <Link
        to={`/${userId}/posts`}
        className="text-white text-lg underline pr-1"
      >
        Back to Posts
      </Link>
      <div className="flex flex-col mt-8">
        <div className="flex gap-2 items-center flex-wrap">
          <p className="text-3xl font-bold text-gray-200">{postData.title}</p>
          <p className="text-lg text-gray-200">{postData.body}</p>
        </div>
      </div>

      <h2 className="font-bold text-gray-400 mt-8 mb-2">Comments</h2>

      {commentData?.length === 0 ? (
        <div>no comments</div>
      ) : (
        commentData?.map((comment) => (
          <p
            key={comment?.id}
            className="text-gray-200 border-b border-white py-4"
          >
            {comment?.name}
          </p>
        ))
      )}
    </div>
  );
};

export default PostDetail;
