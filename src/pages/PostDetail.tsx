import { Button, Spinner, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../config/fetcher";
import { Comment, Post } from "../types";
import CommentCard from "../components/CommentCard";

const PostDetail = () => {
  const { userId, postId } = useParams<{ userId: string; postId: string }>();
  const [commentData, setCommentData] = useState<Comment[]>([]);

  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const [additionComment, setAdditionComment] = useState<Comment[]>([]);

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    fetcher
  );

  const { data: dataComment, isLoading: isLoadingComment } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    fetcher
  );

  const submitPost = async () => {
    setLoading(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments`,
      {
        method: "POST",
        body: JSON.stringify({
          body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const responseJson: Comment = await response.json();
    setAdditionComment((prev: Comment[]) => [
      {
        body: responseJson.body,
        email: "admin@mail.com",
        id: 99,
        name: "Admin",
        postId: 99,
      },
      ...prev,
    ]);
    setLoading(false);
    setBody("");
  };

  const deleteComment = async (postIdToDelete: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${postIdToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    await response.json();
    setCommentData((prevData) =>
      prevData.filter((post) => post.id !== postIdToDelete)
    );
  };

  useEffect(() => {
    setCommentData(dataComment);
  }, [dataComment]);

  const postData: Post = data;

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
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold text-gray-200">{postData.title}</p>
          <p className="text-lg text-gray-200 whitespace-pre-line">
            {postData.body}
          </p>
        </div>
      </div>

      <h2 className="font-bold text-gray-400 mt-8 mb-2">Comments</h2>

      <div>
        <h4 className="font-bold text-gray-400">Add Comment</h4>
        <Textarea
          type="text"
          label="Comment"
          className="mt-2"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
        <Button className="mt-4" onClick={submitPost} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </div>

      {commentData?.length === 0 ? (
        <div>no comments</div>
      ) : (
        [...additionComment, ...commentData]?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
          />
        ))
      )}
    </div>
  );
};

export default PostDetail;
