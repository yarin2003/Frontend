import { createContext, useEffect, useState } from "react";
import { Theme, FC } from "../@types/types";

export const ThemeContext = createContext<Theme>(undefined);

export const ThemeProvider: FC = ({ children }) => {
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);

    if (isDark) {
      document.body.classList.add("dark");
    }
  }, []);

  const [isDark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((d) => {
      localStorage.setItem("theme", !d ? "dark" : "light");
      if (!d) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      return !d;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
