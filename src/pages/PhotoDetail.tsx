import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../config/fetcher";
import { Photo } from "../types";
import { Spinner, Image } from "@nextui-org/react";

const PhotoDetail = () => {
  const { userId, photoId, albumId } = useParams<{
    albumId: string;
    userId: string;
    photoId: string;
  }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/photos/${photoId}`,
    fetcher
  );

  const photoData: Photo = data;

  if (isLoading) return <Spinner className="w-20 h-20" />;
  if (!photoData?.id) return <div>no data</div>;

  // render data
  return (
    <div className="py-12">
      <Link
        to={`/${userId}/albums/${albumId}`}
        className="text-white text-lg underline pr-1"
      >
        Back to Album
      </Link>
      <h1 className="text-2xl text-gray-200 mb-4">{photoData?.title}</h1>
      <Image src={photoData?.url} alt={photoData?.title} />
    </div>
  );
};

export default PhotoDetail;
