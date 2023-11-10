import axios from "axios";

const provider = axios.create({
  method: "get",
  baseURL: "https://api.github.com/",
  headers: { Authorization: "token " + import.meta.env.VITE_KEY },
});

export default provider;
