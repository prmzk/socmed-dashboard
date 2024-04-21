import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Album } from "../types";

type Props = {
  album: Album;
};

const AlbumCard = ({ album }: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center flex-wrap">
          <p className="text-xl font-bold text-gray-200">{album.title}</p>
        </div>
        <div className="flex mt-2">
          <Button color="default" as={Link} to={`${album.id}`}>
            Check Album
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
