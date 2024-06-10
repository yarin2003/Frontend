import { Link } from "react-router-dom";
import styles from "../SearchBar.module.scss"

const AlbumsSearchResult = ({ result }) => {
  return (
    <Link to="/name" state={{entity: "Album", result: result}} className="w-full items-center">
      <div className={styles.result}>
        {result.albumTitle}
      </div>
    </Link>
  );
};

export default AlbumsSearchResult;
