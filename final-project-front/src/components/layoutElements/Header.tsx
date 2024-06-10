import { useContext } from "react";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import DarkModeToggle from "../darkModeToggle/DarkModeToggle";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <header className="sticky dark:bg-slate-700 dark:text-white bg-slate-200 text-slate-900 top-0 z-10">      
      <nav className="flex flex-row justify-between items-center bg-slate-200 center dark:bg-slate-700 text-slate-900 dark:text-white p-3 mb-1">
        <div className="flex flex-row gap-3 ml-2">
          <NavLink to="/">
            <IoHome size={25} className="hover:text-gray-500 dark:hover:text-gray-400"/>
          </NavLink>
          {isLoggedIn && <NavLink to="/artists" className="hover:text-gray-500 dark:hover:text-gray-400">Artists</NavLink>}
          {isLoggedIn && <NavLink to="/albums" className="hover:text-gray-500 dark:hover:text-gray-400">Albums</NavLink>}
          {isLoggedIn && <NavLink to="/songs" className="hover:text-gray-500 dark:hover:text-gray-400">Songs</NavLink>}
        </div>

        <div className="flex flex-row gap-3 mr-2">
          {!isLoggedIn && <NavLink to="/login" className="hover:text-gray-500 dark:hover:text-gray-400">Login</NavLink>}
          {!isLoggedIn && <NavLink to="/register" className="hover:text-gray-500 dark:hover:text-gray-400">Register</NavLink>}
          {isLoggedIn && <NavLink to="/edit" className="hover:text-gray-500 dark:hover:text-gray-400">Edit</NavLink>}
          {isLoggedIn && (
            <button
            className="hover:text-gray-500 dark:hover:text-gray-400"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          )}
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
