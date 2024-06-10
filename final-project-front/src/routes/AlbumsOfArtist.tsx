import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Artist } from "../@types/types";
import { AuthContext } from "../contexts/AuthContext";
import { Album } from "../services/albums-service";
import { isErrorWithMessage, isHttpError401 } from "../utils/axios-helper";
import styles from "./page.module.scss";
import Spinner from "../components/Spinner";
import AlbumItem from "../components/items/AlbumItem";
import RunTimeError from "./error/RunTimeError";

const AlbumsOfArtist = () => {
  const { id } = useParams();
  const artistId = parseInt(id ?? "");

  const location = useLocation();
  const artistName = location.state.name || {};
  const name = artistName;

  if (isNaN(artistId)) {
    throw new Error("Id must be a number!");
  }

  const [artist, setArtist] = useState<Artist>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const res = (await Album.getAlbumsByArtistId(artistId)) as Artist;
        setArtist(res);
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
          <h1 className={styles.h1}>{name} Albums</h1>
          <div className="flex flex-wrap flex-row justify-center pt-4">
            {artist?.albums.map((a) => (
              <AlbumItem key={a.id} {...a} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AlbumsOfArtist;
