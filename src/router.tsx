import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import UserPosts from "./pages/UserPosts";
import PostDetail from "./pages/PostDetail";
import UserAlbums from "./pages/UserAlbums";
import AlbumDetail from "./pages/AlbumDetail";
import PhotoDetail from "./pages/PhotoDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:userId",
    element: <UserDetail />,
    children: [
      {
        path: "posts",
        element: <UserPosts />,
      },

      {
        path: "posts/:postId",
        element: <PostDetail />,
      },
      {
        path: "albums",
        element: <UserAlbums />,
      },
      {
        path: "albums/:albumId",
        element: <AlbumDetail />,
      },
      {
        path: "albums/:albumId/:photoId",
        element: <PhotoDetail />,
      },
    ],
  },

  {
    path: "*",
    element: <div>Not found</div>,
  },
]);

export default router;
