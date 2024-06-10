import { useLocation } from "react-router-dom";
import UpdateAlbum, { UpdateAlbumComponentProps } from "../components/putForms/UpdateAlbum";
import UpdateArtist, {
    UpdateArtistComponentProps,
} from "../components/putForms/UpdateArtist";
import UpdateSong, { UpdateSongComponentProps } from "../components/putForms/UpdateSong";

const Update = () => {
  const location = useLocation();
  const { componentToShow, id ,req } = location.state || {};

  let componentToRender = null;
  if (componentToShow === "updateArtist") {
    const prop = { id, req } as UpdateArtistComponentProps;
    componentToRender = <UpdateArtist {...prop} />;
  } else if (componentToShow === "updateAlbum") {
    const prop = { id, req } as UpdateAlbumComponentProps;
    componentToRender = <UpdateAlbum {...prop}/>;
  } else if (componentToShow === "updateSong") {
    const prop = {id, req} as UpdateSongComponentProps
    componentToRender = <UpdateSong {...prop}/>;
  }

  return <div>{componentToRender}</div>;
};

export default Update;
