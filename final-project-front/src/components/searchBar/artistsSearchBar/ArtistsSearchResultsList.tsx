import { Artist } from "../../../@types/types";
import styles from "../SearchBar.module.scss"
import ArtistsSearchResult from "./ArtistsSearchResult";

const ArtistsSearchResults = ({ results }) => {
  return (
    <div className={styles.div}>
      {results.map((result: Artist) => {
        return <ArtistsSearchResult result={result} key={result.id} />;
      })}
    </div>
  );
};

export default ArtistsSearchResults;
