import useSWR from "swr";
import fetcher from "../config/fetcher";
import { User } from "../types";
import { Link, Outlet, useParams } from "react-router-dom";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    fetcher
  );

  const userData: User = data;

  if (isLoading) return <div>loading...</div>;
  if (!data?.id) return <div>no data</div>;

  // render data
  return (
    <div>
      <h1>{userData?.name}</h1>

      <Link
        to={`/${userId}/albums`}
        style={{
          display: "block",
        }}
      >
        Albums
      </Link>
      <Link
        to={`/${userId}/posts`}
        style={{
          display: "block",
        }}
      >
        Posts
      </Link>
      <Outlet />
    </div>
  );
};

export default UserDetail;
