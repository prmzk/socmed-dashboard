import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../config/fetcher";
import { Post } from "../types";

const UserPosts = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
    fetcher
  );

  const postData: Post[] = data;

  if (isLoading) return <div>loading...</div>;
  if (!postData || !postData[0]) return <div>no data</div>;

  // render data
  return (
    <div>
      {postData?.map((post) => (
        <Link
          to={`/${userId}/posts/${post?.id}`}
          key={post?.id}
          style={{
            display: "block",
          }}
        >
          {post?.title}
        </Link>
      ))}
    </div>
  );
};

export default UserPosts;
