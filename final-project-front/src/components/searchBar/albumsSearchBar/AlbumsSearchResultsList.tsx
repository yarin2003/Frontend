import { Album } from "../../../@types/types";
import styles from "../SearchBar.module.scss";
import AlbumsSearchResult from "./AlbumsSearchResult";

const AlbumsSearchResults = ({ results }) => {
  return (
    <div className={styles.div}>
      {results.map((result: Album) => {
        return <AlbumsSearchResult result={result} key={result.id} />;
      })}
    </div>
  );
};

export default AlbumsSearchResults;
