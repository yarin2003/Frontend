import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Album } from "../@types/types";
import Spinner from "../components/Spinner";
import SongItem from "../components/items/SongItem";
import { AuthContext } from "../contexts/AuthContext";
import { Song } from "../services/songs-service";
import { isErrorWithMessage, isHttpError401 } from "../utils/axios-helper";
import styles from "./page.module.scss";
import RunTimeError from "./error/RunTimeError";

const SongsOfAlbum = () => {
  const { id } = useParams();
  const albumId = parseInt(id ?? "");

  const location = useLocation();
  const albumName = location.state.name || {}
  const name = albumName

  if (isNaN(albumId)) {
    throw new Error("Id must be a number!");
  }

  const [album, setAlbum] = useState<Album>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const res = (await Song.getSongsByAlbumId(albumId)) as Album;
        setAlbum(res);
      } catch (e) {
        if (isHttpError401(e)) {
          return logout();
        }
        if (isErrorWithMessage(e)) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };
    asyncFunction();
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {error && <RunTimeError errorMessage={error} />}
      {!error && !loading && (
        <>
          <h1 className={styles.h1}>{name} Songs</h1>
          <div className="flex flex-wrap flex-row justify-center pt-4">
            {album?.songs.map((s) => (
              <SongItem key={s.id} {...s} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SongsOfAlbum;
