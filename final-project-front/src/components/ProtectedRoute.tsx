import { useContext } from "react";
import { FC } from "../@types/types";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
