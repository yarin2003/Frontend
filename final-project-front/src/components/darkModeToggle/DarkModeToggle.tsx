import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import styles from "./DarkModeToggle.module.scss"

const DarkModeToggle = () => {

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const theme = isDark ? "dark" : "light"

  return (
    <button 
      className={`${styles["toggle-button"]} ${styles[theme]}`}
      onClick={toggleTheme}
    >
        {isDark ? <IoMoonOutline /> : <IoSunnyOutline />}
    </button>
  )
}

export default DarkModeToggle