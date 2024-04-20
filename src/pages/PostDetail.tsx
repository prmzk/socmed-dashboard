import { useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../config/fetcher";
import { Comment, Post } from "../types";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();

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

  if (isLoading || isLoadingComment) return <div>loading...</div>;
  if (!postData?.id) return <div>no data</div>;

  // render data
  return (
    <div>
      <h1>{postData?.title}</h1>

      <h2>Comments</h2>
      {commentData?.length === 0 ? (
        <div>no comments</div>
      ) : (
        commentData?.map((comment) => (
          <div key={comment?.id}>{comment?.name}</div>
        ))
      )}
    </div>
  );
};

export default PostDetail;
