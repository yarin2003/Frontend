import { useContext, useEffect, useState } from "react";
import { SongPage } from "../@types/types";
import { AuthContext } from "../contexts/AuthContext";
import { Song } from "../services/songs-service";
import { isErrorWithMessage, isHttpError401 } from "../utils/axios-helper";
import Spinner from "../components/Spinner";
import SongItem from "../components/items/SongItem";
import styles from "./page.module.scss";
import SongsSearchBar from "../components/searchBar/songsSearchBar/SongsSearchBar";
import SongsSearchResultsList from "../components/searchBar/songsSearchBar/SongsSearchResultsList";
import RunTimeError from "./error/RunTimeError";
import { IoArrowUndoSharp, IoArrowRedoSharp } from "react-icons/io5";

const Songs = () => {
  const [page, setPage] = useState<SongPage>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const res = (await Song.getAllSongs(pageNo)) as SongPage;
        setPage(res);
      } catch (e) {
        if (isHttpError401(e)) {
          return logout();
        }
        if (isErrorWithMessage(e)) setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    asyncFunction();
  }, []);

  const handleNextPageClick = async () => {
    try {
      setLoading(true);
      if (pageNo + 1 < page.totalPages) {
        const res = await Song.getAllSongs(pageNo + 1);
        setPage(res);
        setPageNo(pageNo + 1);
      }
    } catch (e) {
      if (isHttpError401(e)) {
        return logout();
      }
      if (isErrorWithMessage(e)) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPageClick = async () => {
    try {
      setLoading(true);
      if (pageNo - 1 >= 0) {
        const res = await Song.getAllSongs(pageNo - 1);
        setPage(res);
        setPageNo(pageNo - 1);
      }
    } catch (e) {
      if (isHttpError401(e)) {
        return logout();
      }
      if (isErrorWithMessage(e)) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && <Spinner />}
      {error && <RunTimeError errorMessage={error} />}
      {!error && !loading && (
        <>
          <div className="flex flex-col w-1/3 absolute top-0">
            <SongsSearchBar setResults={setResults} />
            <SongsSearchResultsList results={results} />
          </div>

          <h1 className={styles.h1}>SONGS</h1>

          <div className="flex flex-wrap flex-row justify-center pt-4">
            {page?.songs.map((s) => (
              <SongItem key={s.id} {...s} />
            ))}
          </div>
          <div className="text-lg flex flex-row gap-1 items-center justify-center mb-4 mt-1">
            <button>
              <IoArrowUndoSharp
                size={30}
                color="#475569"
                onClick={() => handlePrevPageClick()}
              />
            </button>
            {pageNo + 1}
            <button>
              <IoArrowRedoSharp
                size={30}
                color="#475569"
                onClick={() => handleNextPageClick()}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Songs;
