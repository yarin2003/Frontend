import { Link } from "react-router-dom"
import styles from "./Edit.module.scss"

const EditButtons = () => {
  return (
    <div>
        <div className="flex flex-row gap-2 mx-auto items-center justify-around w-2/3">
          <Link
            className="flex justify-center w-full"
            to="/edit"
            state={{ tableName: "artists table" }}
          >
            <button className={styles.button}>
              edit artists
            </button>
          </Link>
          <Link
            className="flex justify-center w-full"
            to="/edit"
            state={{ tableName: "albums table" }}
          >
            <button className={styles.button}>
              edit albums
            </button>
          </Link>
          <Link
            className="flex justify-center w-full"
            to="/edit"
            state={{ tableName: "songs table" }}
          >
            <button className={styles.button}>
              edit songs
            </button>
          </Link>
        </div>
      </div>
  )
}

export default EditButtons