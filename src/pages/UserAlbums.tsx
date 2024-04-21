import { useParams } from "react-router-dom";
import useSWR from "swr";
import AlbumCard from "../components/AlbumCard";
import fetcher from "../config/fetcher";
import { Album } from "../types";
import { Spinner } from "@nextui-org/react";

const UserAlbums = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
    fetcher
  );

  const albumData: Album[] = data;

  if (isLoading) return <Spinner className="w-20 h-20" />;
  if (!albumData || !albumData[0]) return <div>no data</div>;

  // render data
  return (
    <div>
      <h3 className="text-2xl text-gray-300 mt-8">Album List</h3>
      <div className="grid gap-4 py-8">
        {albumData?.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default UserAlbums;
