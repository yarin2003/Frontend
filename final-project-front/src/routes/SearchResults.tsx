import { useLocation } from "react-router-dom";
import AlbumItem from "../components/items/AlbumItem";
import ArtistItem from "../components/items/ArtistItem";
import SongItem from "../components/items/SongItem";
import styles from "./page.module.scss";

const SearchResults = () => {
  const location = useLocation();
  const entity = location.state.entity || {};
  const result = location.state.result || {};

  return (
    <div>
      {entity === "Artist" && (
        <>
          <h1 className={styles.h1}>{result.name}</h1>
          <div className="flex flex-wrap flex-row justify-center pt-4">
            <ArtistItem key={result.id} {...result} />
          </div>
        </>
      )}
      {entity === "Album" && (
        <>
          <h1 className={styles.h1}>{result.albumTitle}</h1>
          <div className="flex flex-wrap flex-row justify-center pt-4">
            <AlbumItem key={result.id} {...result} />
          </div>
        </>
      )}
      {entity === "Song" && (
        <>
          <h1 className={styles.h1}>{result.songTitle}</h1>
          <div className="flex flex-wrap flex-row justify-center pt-4">
            <SongItem key={result.id} {...result} />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
