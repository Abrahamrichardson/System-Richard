
import React from "react";
import usePrevious from "../hooks/usePrevious";

export default function Todos({
  data = [],
  loading = false,
  error = "",
  search,
  setSearch,
  saveSearch,
  searchHistory = [],
  page = 1
}) {
  const previousSearch = usePrevious(search);

  const filtered = (data || []).filter(todo =>
    (todo.title || "").toLowerCase().includes((search || "").toLowerCase())
  );

  const start = (page - 1) * 5;
  const paginated = filtered.slice(start, start + 5);

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Todos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => saveSearch?.()}>OK</button>
      </div>

      <p>Previous Search: {previousSearch}</p>

      <div className="history-box">
        <h4>Last 5 Searches:</h4>
        <ul>
          {(!searchHistory || searchHistory.length === 0) && <li>No previous searches</li>}
          {searchHistory?.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      {loading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}

      {paginated.map(todo => (
        <div className="card" key={todo.id}>
          <h4>{todo.title}</h4>
          <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
}
