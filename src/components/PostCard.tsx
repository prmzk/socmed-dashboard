import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Post } from "../types";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="flex border-b border-gray-300 py-8">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center flex-wrap">
          <p className="text-xl font-bold text-gray-200">{post.title}</p>
          <p className="text-md text-gray-200">{post.body}</p>
        </div>
        <div className="flex mt-2">
          <Button color="default" as={Link} to={`${post.id}`}>
            Check Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
