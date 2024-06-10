import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './Error.module.scss'

const GenericError = () => {
  const error = useRouteError();

  let errorMessage = "";
  if(error instanceof Error){
    errorMessage = error.message;
  } else if(typeof error === "string"){
    errorMessage = error;
  } else if(isRouteErrorResponse(error)){
    errorMessage = `${error.data} Status: ${error.status} ${error.statusText}`
  }

  return (
    <div className={styles.error}>
        <h1>Oops</h1>
        <p>Sorry, an error accured</p>
        <p>{errorMessage}</p>
    </div>
  )
}

export default GenericError