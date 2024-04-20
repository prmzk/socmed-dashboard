import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../config/fetcher";
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

  if (isLoading || isLoadingPhotos) return <div>loading...</div>;
  if (!albumData?.id) return <div>no data</div>;

  // render data
  return (
    <div>
      <h1>{albumData?.title}</h1>
      <h2>Photos</h2>
      {photoData.length > 0 ? (
        photoData?.map((photo) => (
          <div key={photo?.id}>
            <Link
              to={`/${userId}/albums/${albumId}/${photo?.id}`}
              key={photo?.id}
              style={{
                display: "block",
              }}
            >
              <img src={photo?.thumbnailUrl} alt={photo?.title} />
            </Link>
          </div>
        ))
      ) : (
        <div>no photos</div>
      )}
      <div></div>
    </div>
  );
};

export default AlbumDetail;
