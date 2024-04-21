import { Button, Input, Textarea } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Post } from "../types";
import { useState } from "react";

type Props = {
  post: Post;
  deletePost: (postIdToDelete: number) => Promise<void>;
};

const PostCard = ({ post, deletePost }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const editPost = async () => {
    setLoading(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    await response.json();
    setLoading(false);
    setIsEdit(false);
  };

  const submitDelete = async () => {
    setLoading(true);
    await deletePost(post.id);
    setLoading(false);
  };

  return (
    <div className="flex border-b border-gray-300 py-8">
      <div className="flex flex-col">
        {!isEdit ? (
          <div className="flex flex-col gap-2 flex-wrap">
            <p className="text-xl font-bold text-gray-200">{title}</p>
            <p className="text-md text-gray-200 whitespace-pre-line">{body}</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center flex-wrap">
            <Input
              type="text"
              label="Title"
              className="mt-2"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Textarea
              type="text"
              label="Post"
              className="mt-2"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
          </div>
        )}
        {!isEdit ? (
          <div className="flex mt-2 gap-3">
            <Button
              color="default"
              as={Link}
              to={`${post.id}`}
              disabled={loading}
            >
              Check Comment
            </Button>
            <Button
              color="default"
              onClick={() => setIsEdit(true)}
              disabled={loading}
            >
              Edit Post
            </Button>
            <Button color="danger" onClick={submitDelete} disabled={loading}>
              {loading ? "Loading..." : "Delete Post"}
            </Button>
          </div>
        ) : (
          <div className="flex mt-2 gap-3">
            <Button color="default" onClick={editPost} disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
