import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { Comment } from "../types";

type Props = {
  comment: Comment;
  deleteComment: (commentIdToDelete: number) => Promise<void>;
};

const CommentCard = ({ comment, deleteComment }: Props) => {
  const [body, setBody] = useState(comment.body);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const editComment = async () => {
    setLoading(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${comment.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
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
    await deleteComment(comment.id);
    setLoading(false);
  };

  return (
    <div className="flex border-b border-gray-300 py-8">
      <div className="flex flex-col">
        {!isEdit ? (
          <div className="py-4 ">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-gray-200 font-bold">{comment?.name}</p>
              <p className="text-gray-200 font-bold">-</p>
              <p className="text-gray-200 font-bold">{comment?.email}</p>
            </div>
            <p className="text-gray-200 whitespace-pre-line">{body}</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center flex-wrap">
            <Textarea
              type="text"
              label="Comment"
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
              onClick={() => setIsEdit(true)}
              disabled={loading}
            >
              Edit Comment
            </Button>
            <Button color="danger" onClick={submitDelete} disabled={loading}>
              {loading ? "Loading..." : "Delete Comment"}
            </Button>
          </div>
        ) : (
          <div className="flex mt-2 gap-3">
            <Button color="default" onClick={editComment} disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
