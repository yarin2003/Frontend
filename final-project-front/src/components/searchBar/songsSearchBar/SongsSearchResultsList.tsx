import { Song } from "../../../@types/types";
import styles from "../SearchBar.module.scss";
import SongsSearchResult from "./SongsSearchResult";

const SongsSearchResults = ({ results }) => {
  return (
    <div className={styles.div}>
      {results.map((result: Song) => {
        return <SongsSearchResult result={result} key={result.id} />;
      })} 
    </div>
  );
};

export default SongsSearchResults;
