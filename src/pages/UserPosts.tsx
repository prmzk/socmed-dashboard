import { useParams } from "react-router-dom";
import useSWR from "swr";
import PostCard from "../components/PostCard";
import fetcher from "../config/fetcher";
import { Post } from "../types";
import { Button, Spinner } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

const UserPosts = () => {
  const { userId } = useParams<{ userId: string }>();
  const [postData, setPostData] = useState<Post[]>([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const [additionPost, setAdditionPost] = useState<Post[]>([]);

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
    fetcher
  );

  const submitPost = async () => {
    setLoading(true);
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const responseJson: Post = await response.json();
    setAdditionPost((prev: Post[]) => [responseJson, ...prev]);
    setLoading(false);
    setTitle("");
    setBody("");
  };

  const deletePost = async (postIdToDelete: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    await response.json();
    setPostData((prevData) =>
      prevData.filter((post) => post.id !== postIdToDelete)
    );
  };

  useEffect(() => {
    setPostData(data);
  }, [data]);

  if (isLoading) return <Spinner className="w-20 h-20" />;
  if (!postData || !postData[0]) return <div>no data</div>;

  // render data
  return (
    <div>
      <h3 className="text-2xl text-gray-300 mt-8 mb-4">Post List</h3>

      <div>
        <h4 className="font-bold text-gray-400">Add Post</h4>
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
        <Button className="mt-4" onClick={submitPost} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </div>

      <div className="grid py-8">
        {[...additionPost, ...postData]?.map((post) => (
          <PostCard key={post.id} post={post} deletePost={deletePost} />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
