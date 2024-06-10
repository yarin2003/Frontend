import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import AddButtons from "../components/edit/AddButtons";
import AlbumsTable from "../components/edit/AlbumsTable";
import ArtistsTable from "../components/edit/ArtistsTable";
import EditButtons from "../components/edit/EditButtons";
import SongsTable from "../components/edit/SongsTable";
import AuthorizationError from "./error/AuthorizationError";

interface DecodedToken {
  sub: string;
  exp: number;
  iat: number;
  scope: string;
}

const Edit = () => {
  const decodedToken: DecodedToken  = jwtDecode(localStorage.getItem("token"))
  if (decodedToken.scope !== "ROLE_ADMIN")
    return <AuthorizationError/>

  const location = useLocation();
  let { tableName } = location.state || {};
  tableName = tableName || "artists table";

  return (
    <div className="flex flex-col my-3">
      <AddButtons />
      
      <div className="my-2">
        {tableName === "artists table" && <ArtistsTable />}
        {tableName === "albums table" && <AlbumsTable />}
        {tableName === "songs table" && <SongsTable />}
      </div>

      <EditButtons />
    </div>
  );
};

export default Edit;
