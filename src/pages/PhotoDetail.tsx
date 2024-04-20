import { useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../config/fetcher";
import { Photo } from "../types";

const PhotoDetail = () => {
  const { photoId } = useParams<{ photoId: string }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/photos/${photoId}`,
    fetcher
  );

  const photoData: Photo = data;

  if (isLoading) return <div>loading...</div>;
  if (!photoData?.id) return <div>no data</div>;

  // render data
  return (
    <div>
      <h1>{photoData?.title}</h1>
      <img src={photoData?.url} alt={photoData?.title} />
    </div>
  );
};

export default PhotoDetail;
