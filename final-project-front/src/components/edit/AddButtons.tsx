import { Link } from "react-router-dom"
import styles from "./Edit.module.scss"

const AddButtons = () => {
  return (
    <div>
      <div className="flex flex-row gap-2 items-center justify-around">
        <Link
          className="flex justify-center w-full"
          to="/post"
          state={{ componentToShow: "addArtist" }}
        >
          <button className={styles.button}>
            add artist
          </button>
        </Link>
        <Link
          className="flex justify-center w-full"
          to="/post"
          state={{ componentToShow: "addAlbum" }}
        >
          <button className={styles.button}>
            add album
          </button>
        </Link>
        <Link
          className="flex justify-center w-full"
          to="/post"
          state={{ componentToShow: "addSong" }}
        >
          <button className={styles.button}>
            add song
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AddButtons