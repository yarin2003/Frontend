import { useContext, useEffect, useState } from "react";
import type { ArtistPage } from "../@types/types.d.ts";
import Spinner from "../components/Spinner.tsx";
import ArtistItem from "../components/items/ArtistItem.tsx";
import ArtistsSearchBar from "../components/searchBar/artistsSearchBar/ArtistsSearchBar.tsx";
import ArtistsSearchResultsList from "../components/searchBar/artistsSearchBar/ArtistsSearchResultsList.tsx";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { Artist } from "../services/artists-service.ts";
import { isErrorWithMessage, isHttpError401 } from "../utils/axios-helper.ts";
import RunTimeError from "./error/RunTimeError.tsx";
import styles from "./page.module.scss";
import { IoArrowUndoSharp, IoArrowRedoSharp } from "react-icons/io5";

const Artists = () => {
  const [page, setPage] = useState<ArtistPage>();
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
        const res = (await Artist.getArtists(pageNo)) as ArtistPage;
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
        const res = await Artist.getArtists(pageNo + 1);
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
        const res = await Artist.getArtists(pageNo - 1);
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
            <ArtistsSearchBar setResults={setResults} />
            <ArtistsSearchResultsList results={results} />
          </div>

          <h1 className={styles.h1}>ARTISTS</h1>

          <div className="flex flex-wrap flex-row justify-center pt-4">
            {page?.artists.map((a) => (
              <ArtistItem key={a.id} {...a} />
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

export default Artists;
