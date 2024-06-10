import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Artist } from "../../../@types/types";
import { request } from "../../../utils/axios-helper";
import styles from "../SearchBar.module.scss"

const ArtistsSearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const search = async (value: string) => {
    setInput(value);
    const res = await request({ url: `/artists/name?name=${value}` });
    setResults(res.data as Artist);
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
        placeholder="  Search Artists..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};

export default ArtistsSearchBar;
