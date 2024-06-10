import { Link } from "react-router-dom";
import styles from "../SearchBar.module.scss"

const SongsSearchResult = ({ result }) => {
  return (
    <Link to="/name" state={{entity: "Song", result: result}} className="w-full items-center">
      <div className={styles.result}>
        {result.songTitle}
      </div>
    </Link>
  );
};

export default SongsSearchResult;
