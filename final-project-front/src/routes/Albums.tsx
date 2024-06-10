import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AlbumPage } from "../@types/types";
import { Album } from "../services/albums-service";
import { isErrorWithMessage, isHttpError401 } from "../utils/axios-helper";
import Spinner from "../components/Spinner";
import styles from "./page.module.scss";
import AlbumItem from "../components/items/AlbumItem";
import AlbumsSearchBar from "../components/searchBar/albumsSearchBar/AlbumsSearchBar";
import AlbumsSearchResultsList from "../components/searchBar/albumsSearchBar/AlbumsSearchResultsList";
import RunTimeError from "./error/RunTimeError";
import { IoArrowUndoSharp, IoArrowRedoSharp } from "react-icons/io5";

const Albums = () => {
  const [page, setPage] = useState<AlbumPage>();
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
        const res = (await Album.getAllAlbums(pageNo)) as AlbumPage;
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
        const res = await Album.getAllAlbums(pageNo + 1);
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
        const res = await Album.getAllAlbums(pageNo - 1);
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
            <AlbumsSearchBar setResults={setResults} />
            <AlbumsSearchResultsList results={results} />
          </div>

          <h1 className={styles.h1}>ALBUMS</h1>
          <div className="flex flex-wrap flex-row justify-center pt-4">
            {page?.albums.map((a) => (
              <AlbumItem key={a.id} {...a} />
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

export default Albums;
