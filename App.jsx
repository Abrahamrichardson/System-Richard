import React, { useContext, useState } from "react";
import useFetch from "./hooks/useFetch";
import Tabs from "./components/Tabs";
import Users from "./components/Users";
import Todos from "./components/Todos";
import Pagination from "./components/Pagintion";
import { ThemeContext } from "./context/ThemeContext";
import "./styles.css";

export default function App() {
  const [active, setActive] = useState("users");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [searchHistory, setSearchHistory] = useState([]);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const usersAPI = "https://jsonplaceholder.typicode.com/users";
  const todosAPI = "https://jsonplaceholder.typicode.com/todos";

  const users = useFetch(usersAPI);
  const todos = useFetch(todosAPI);

  // Save full search only when OK is clicked
  const saveSearch = () => {
    const trimmed = (search || "").trim();
    if (!trimmed) return;

    setSearchHistory(prev => {
      // keep unique entries and latest-first
      const updated = [trimmed, ...prev.filter(item => item !== trimmed)];
      return updated.slice(0, 5);
    });
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Dashboard</h1>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <Tabs active={active} setActive={setActive} />

      {active === "users" && (
        <Users
          data={users.data}
          loading={users.loading}
          error={users.error}
          search={search}
          setSearch={setSearch}
          saveSearch={saveSearch}
          searchHistory={searchHistory}
        />
      )}

      {active === "todos" && (
        <>
          <Todos
            data={todos.data}
            loading={todos.loading}
            error={todos.error}
            search={search}
            setSearch={setSearch}
            saveSearch={saveSearch}
            searchHistory={searchHistory}
            page={page}
          />

          <Pagination total={todos.data.length || 0} page={page} setPage={setPage} />
        </>
      )}
    </div>
  );
}
