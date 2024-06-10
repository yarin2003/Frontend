import { createContext, useEffect, useState } from "react";
import type { AuthContextType, FC } from "../@types/types";
import { Dialogs } from "../ui/dialogs";

export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider: FC = ({ children }) => {
  const [jwt, setJWT] = useState<string | null>();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setJWT(token);
      setIsLoggedIn(true);
    } else {
      setJWT(null);
      setIsLoggedIn(false);
    }
  }, []);

  const login = (jwt: string) => {
    setJWT(jwt);
    setIsLoggedIn(true);
    localStorage.setItem("token", jwt);
  };

  const logout = async () => {
    if (await Dialogs.areUSure("Are you sure you want to logout?")) {
      setJWT(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    }
  };

  const values = { isLoggedIn, jwt, login, logout };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
