import { useRouteError } from "react-router-dom";
import styles from "./Error.module.scss";

const InvalidIdError = () => {
  const error = useRouteError();

  let errorMessage = "";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className={styles.error}>
      <h1>Oops</h1>
      <p>Invalid id</p>
      <p>{errorMessage}</p>
    </div>
  );
};

export default InvalidIdError;
