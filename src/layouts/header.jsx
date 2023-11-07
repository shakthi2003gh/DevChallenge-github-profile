import { useState } from "react";
import SearchBar from "../components/searchBar";

export default function Header({ setSelect }) {
  const [username, setUsername] = useState("Github");
  const [users, setUsers] = useState([]);

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
