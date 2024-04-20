import useSWR from "swr";
import fetcher from "../config/fetcher";
import { User } from "../types";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  const userData: User[] = data;

  if (isLoading) return <div>loading...</div>;
  if (!userData || !userData[0]) return <div>no data</div>;

  // render data
  return (
    <div>
      {userData?.map((user) => (
        <Link
          to={`/${user?.id}`}
          key={user?.id}
          style={{
            display: "block",
          }}
        >
          {user?.name}
        </Link>
      ))}
    </div>
  );
};

export default Home;
