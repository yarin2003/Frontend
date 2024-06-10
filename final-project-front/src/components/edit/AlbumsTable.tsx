import { useContext, useEffect, useState } from "react";
import { AlbumPage } from "../../@types/types";
import { AuthContext } from "../../contexts/AuthContext";
import { Album } from "../../services/albums-service";
import { isErrorWithMessage, isHttpError401 } from "../../utils/axios-helper";
import styles from "./Edit.module.scss";
import "./Edit.module.scss";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { deleteAlbumRequest } from "../../controllers/album-controller";
import RunTimeError from "../../routes/error/RunTimeError";
import { IoArrowUndoSharp, IoArrowRedoSharp } from "react-icons/io5";

const AlbumsTable = () => {
  const [page, setPage] = useState<AlbumPage>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
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
        <div>
          <h1 className={styles.h1}>ALBUMS</h1>
          <div className="h-96 mt-5 w-5/6 flex flex-col m-auto">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                    <thead>
                      <tr>
                        <th scope="col">Album Title</th>
                        <th scope="col">Album Released</th>
                        <th scope="col">Length</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page?.albums.map((a) => (
                        <tr key={a.id}>
                          <td scope="col">{a.albumTitle}</td>
                          <td scope="col">{a.albumReleased}</td>
                          <td scope="col">{a.length}</td>
                          <td scope="col">
                            <Link
                              className="w-full"
                              to="/update"
                              state={{
                                componentToShow: "updateSong",
                                id: a.id,
                                req: a,
                              }}
                            >
                              <button className={styles.updateButton}>
                                update
                              </button>
                            </Link>
                            <button
                              onClick={() => deleteAlbumRequest(a.id)}
                              className={styles.deleteButton}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
        </div>
      )}
    </div>
  );
};

export default AlbumsTable;
