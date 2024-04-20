import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../config/fetcher";
import { Album } from "../types";

const UserAlbums = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
    fetcher
  );

  const albumData: Album[] = data;

  if (isLoading) return <div>loading...</div>;
  if (!albumData || !albumData[0]) return <div>no data</div>;

  // render data
  return (
    <div>
      {albumData?.map((album) => (
        <Link
          to={`/${userId}/albums/${album?.id}`}
          key={album?.id}
          style={{
            display: "block",
          }}
        >
          {album?.title}
        </Link>
      ))}
    </div>
  );
};

export default UserAlbums;
