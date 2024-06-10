import { Song } from "../../@types/types";
import Card from "../Card";
import styles from "./Item.module.scss";

const SongItem = (request: Song) => {

  const {
    id,
    songTitle,
    songReleased,
    genres,
    length,
    label,
    songWriters,
    producers,
    songImageUrl,
  } = request

  return (
    <Card>
      <img src={songImageUrl} alt="song img" className={styles.img} />
      <h2><b>Title:</b> {songTitle}</h2>
      <p><b>Released date:</b> {songReleased}</p>
      <p><b>Genres:</b> {genres}</p>
      <p><b>Length:</b> {length}</p>
      <p><b>Label:</b> {label}</p>
      <p><b>Song writers:</b> {songWriters}</p>
      <p><b>Producers:</b> {producers}</p>
    </Card>)
};

export default SongItem;
