import useSWR from "swr";
import UserCard from "../components/UserCard";
import fetcher from "../config/fetcher";
import { User } from "../types";
import { Spinner } from "@nextui-org/react";

const Home = () => {
  const { data, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  const userData: User[] = data;

  if (isLoading) return <Spinner className="w-20 h-20" />;
  if (!userData || !userData[0]) return <div>no data</div>;

  // render data
  return (
    <div className="flex flex-col">
      <div className="flex items-center pt-4 my-4">
        <h2 className="text-white text-lg">User List</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {userData?.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
