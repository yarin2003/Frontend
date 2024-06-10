import { RouteObject } from "react-router-dom";
import About from "./About";
import Login from "./Login";
import Register from "./Register";
import Error from "./error/GenericError";
import Root from "./layout/root/Root";
import Artists from "./Artists";
import ArtistIdError from "./error/InvalidIdError";
import ProtectedRoute from "../components/ProtectedRoute";
import Post from "./Post";
import Update from "./Update";
import AlbumsOfArtist from "./AlbumsOfArtist";
import SongsOfAlbum from "./SongsOfAlbum";
import Albums from "./Albums";
import Songs from "./Songs";
import SearchResults from "./SearchResults";
import Edit from "./Edit";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <About />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/edit",
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/name",
        element: (
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        ),
      },
      {
        path: "/artists",
        element: (
          <ProtectedRoute>
            <Artists />
          </ProtectedRoute>
        ),
      },
      {
        path: "/albums",
        element: (
          <ProtectedRoute>
            <Albums />
          </ProtectedRoute>
        ),
      },
      {
        path: "/songs",
        element: (
          <ProtectedRoute>
            <Songs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/artists/:id/albums",
        element: (
          <ProtectedRoute>
            <AlbumsOfArtist />
          </ProtectedRoute>
        ),
        errorElement: <ArtistIdError />,
      },
      {
        path: "albums/:id/songs",
        element: (
          <ProtectedRoute>
            <SongsOfAlbum />
          </ProtectedRoute>
        ),
        errorElement: <ArtistIdError />,
      },
      {
        path: "/post",
        element: (
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update",
        element: (
          <ProtectedRoute>
            <Update />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
