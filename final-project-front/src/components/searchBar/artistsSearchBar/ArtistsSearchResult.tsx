import { Link } from "react-router-dom";
import styles from "../SearchBar.module.scss"

const ArtistsSearchResult = ({ result }) => {
  return (
    <Link to="/name" state={{entity: "Artist", result: result}} className="w-full items-center">
      <div className={styles.result}>
        {result.name}
      </div>
    </Link>
  );
};

export default ArtistsSearchResult;
