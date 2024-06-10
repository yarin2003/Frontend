import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Song } from "../../../@types/types";
import { request } from "../../../utils/axios-helper";
import styles from "../SearchBar.module.scss"

const SongsSearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const search = async (value: string) => {
    setInput(value);
    const res = await request({ url: `/songs/name?name=${value}` });
    setResults(res.data as Song);
  };

  const handleChange = (value: string) => {
    setInput(value);
    search(value);
  };

  return (
    <div className="flex flex-row gap-2 ml-3">
        <IoSearchOutline size={20} />
      <input
        type="text"
        placeholder="  Search Songs..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};

export default SongsSearchBar;
