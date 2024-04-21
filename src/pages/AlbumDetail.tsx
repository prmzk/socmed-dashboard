import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../config/fetcher";
import { Image, Spinner } from "@nextui-org/react";
import { Album, Photo } from "../types";

const AlbumDetail = () => {
  const { albumId, userId } = useParams<{ albumId: string; userId: string }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    fetcher
  );

  const { data: dataPhotos, isLoading: isLoadingPhotos } = useSWR(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
    fetcher
  );

  const albumData: Album = data;
  const photoData: Photo[] = dataPhotos;

  if (isLoading || isLoadingPhotos) return <Spinner className="w-20 h-20" />;
  if (!albumData?.id) return <div>no data</div>;

  // render data
  return (
    <div className="py-8">
      <p className="text-xl font-bold text-gray-200 mb-4">{albumData.title}</p>
      <h2 className="font-bold text-gray-400 mb-2">Photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {photoData.length > 0 ? (
          photoData?.map((photo) => (
            <div key={photo?.id} className="hover:scale-105 transition-all">
              <Link
                to={`/${userId}/albums/${albumId}/${photo?.id}`}
                key={photo?.id}
                style={{
                  display: "block",
                }}
              >
                <Image src={photo?.thumbnailUrl} alt={photo?.title} />
              </Link>
            </div>
          ))
        ) : (
          <div>no photos</div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
