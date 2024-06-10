import styles from "./Error.module.scss";

const AuthorizationError = () => {

  return (
    <div className={styles.error}>
      <h1>Oops</h1>
      <h2>401</h2>
      <p>Authorization required</p>
      <img src="https://t4.ftcdn.net/jpg/00/48/07/51/360_F_48075185_JhT9kwXPXWEDFbniLCH3ENtjwPEwFqeP.jpg" alt="kick out img" />
    </div>
  );
};

export default AuthorizationError;
