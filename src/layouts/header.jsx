import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar";
import { searchUser } from "../services/http";

export default function Header({ setSelect }) {
  const [username, setUsername] = useState("Github");
  const [debounceInputValue, setDebounceInputValue] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (username === debounceInputValue) return;

      searchUser(username).then(setUsers);
      setDebounceInputValue(username);
    }, 800);

    return () => {
      clearTimeout(debounce);
    };
  }, [username]);

  return (
    <header>
      <SearchBar
        placeholder="@username"
        datalist={users}
        onChange={setUsername}
        setSelect={setSelect}
      />
    </header>
  );
}
