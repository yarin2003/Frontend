import { useLocation } from "react-router-dom";
import AddAlbum from "../components/postForms/AddAlbum";
import AddSong from "../components/postForms/AddSong";
import AddArtist from "../components/postForms/AddArtist";

const Post = () => {
  const location = useLocation();
  const { componentToShow } = location.state || {};
 
  let componentToRender = null;
  if (componentToShow === "addArtist") {
    componentToRender = <AddArtist />;
  } else if (componentToShow === "addAlbum") {
    componentToRender = <AddAlbum />;
  } else if (componentToShow === "addSong") {
    componentToRender = <AddSong />;
  }

  return (
    <div>
      {componentToRender}
    </div>
  );
};

export default Post;
