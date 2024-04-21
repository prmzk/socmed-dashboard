import { useParams } from "react-router-dom";
import useSWR from "swr";
import PostCard from "../components/PostCard";
import fetcher from "../config/fetcher";
import { Post } from "../types";
import { Spinner } from "@nextui-org/react";

const UserPosts = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
    fetcher
  );

  const postData: Post[] = data;

  if (isLoading) return <Spinner className="w-20 h-20" />;
  if (!postData || !postData[0]) return <div>no data</div>;

  // render data
  return (
    <div>
      <h3 className="text-2xl text-gray-300 mt-8">Post List</h3>
      <div className="grid py-8">
        {postData?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
