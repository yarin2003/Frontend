import styles from "./Error.module.scss";

const RunTimeError = ({ errorMessage }) => {
  return (
    <div className={styles.error}>
      <h1>Oops</h1>
      <p>Sorry, an error accured</p>
      <p>{errorMessage}</p>
    </div>
  );
};

export default RunTimeError;
