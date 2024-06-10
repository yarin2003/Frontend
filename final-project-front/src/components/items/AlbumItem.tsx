import { Link } from "react-router-dom";
import { Album } from "../../@types/types";
import Card from "../Card";
import styles from "./Item.module.scss";

const AlbumItem = (request: Album) => {

  const {
    id,
    albumTitle,
    albumReleased,
    length,
    albumImageUrl
  } = request

  return (
    <Link to={`/albums/${id}/songs`} state={{name: albumTitle}}>
    <Card>
      <img src={albumImageUrl} alt="album img" className={styles.img} />
      <h2><b>Title:</b> {albumTitle}</h2>
      <p><b>Released date:</b> {albumReleased}</p>
      <p><b>Length:</b> {length}</p>
     </Card>
     </Link>
  );
};

export default AlbumItem;
