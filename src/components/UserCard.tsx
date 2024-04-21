import { Link } from "react-router-dom";
import { User } from "../types";
import { Button } from "@nextui-org/react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center flex-wrap">
          <p className="text-xl font-bold text-gray-200">{user.name}</p>
          <h3 className="text-md text-gray-200">@{user.username}</h3>
        </div>
        <p className="text-md text-gray-200">{user.email}</p>
        <p className="text-md text-gray-200">{user.company.name}</p>
        <div className="flex mt-4">
          <Button color="default" as={Link} to={`/${user.id}`}>
            Check User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
