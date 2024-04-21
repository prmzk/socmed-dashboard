import useSWR from "swr";
import fetcher from "../config/fetcher";
import { User } from "../types";
import { Link, Outlet, useParams } from "react-router-dom";
import { Tabs, Tab, Card, CardBody, Button, Spinner } from "@nextui-org/react";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    fetcher
  );

  const userData: User = data;

  if (isLoading) return <Spinner className="w-20 h-20" />;
  if (!data?.id) return <div>no data</div>;

  // render data
  return (
    <div>
      <div className="flex items-center pt-4 my-4">
        <Link to="/" className="text-white text-lg underline pr-1">
          Home
        </Link>
        <h2 className="text-white text-lg"> / User Detail</h2>
      </div>
      <h2 className="text-white font-bold text-6xl mb-3">{userData?.name}</h2>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" className="mt-6">
          <Tab key="info" title="Info">
            <Card>
              <CardBody className="bg-gray-600">
                <div className="flex flex-col">
                  <p className="text-md text-gray-200 text-md">
                    @{userData?.username}
                  </p>
                  <p className="text-md text-gray-200 text-md">
                    {userData?.email}
                  </p>
                  <p className="text-md text-gray-200 text-md">
                    {userData?.phone}
                  </p>
                  <p className="text-md text-gray-200 text-md">
                    {userData?.website}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="address" title="Address">
            <Card>
              <CardBody className="bg-gray-600">
                <div className="flex flex-col">
                  <p className="text-md text-gray-200 text-md">
                    Street: {userData?.address.street}
                  </p>
                  <p className="text-md text-gray-200 text-md">
                    Suite: {userData?.address.suite}
                  </p>
                  <p className="text-md text-gray-200 text-md">
                    City: {userData?.address.city}
                  </p>
                  <p className="text-md text-gray-200 text-md">
                    ZipCode: {userData?.address.zipcode}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="company" title="Company">
            <Card>
              <CardBody className="bg-gray-600">
                <div className="flex flex-col">
                  <p className="text-md text-gray-200 text-md">
                    {userData?.company.name}
                  </p>
                  <p className="text-md text-gray-200 text-md">
                    {userData?.company.catchPhrase}
                  </p>
                  <p className="text-md text-gray-200 text-md">
                    {userData?.company.bs}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 mt-8 gap-4">
        <Button color="default" as={Link} to={`/${userId}/albums`}>
          Albums
        </Button>
        <Button color="default" as={Link} to={`/${userId}/posts`}>
          Posts
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default UserDetail;
