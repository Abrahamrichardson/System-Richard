


// import usePrevious from "../hooks/usePrevious";

// export default function Users({ data, loading, error, search, setSearch, searchHistory }) {
//   const previousSearch = usePrevious(search);

//   const filtered = data.filter(user =>
//     user.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>

// <div className="search-box">
//   <input
//     type="text"
//     placeholder="Search Users"
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//   />

//   <button onClick={saveSearch}>OK</button>
// </div>



//       <p>Previous Search: {previousSearch}</p>

//       <div className="history-box">
//   <h4>Last 5 Searches:</h4>
//   <ul>
//     {(!searchHistory || searchHistory.length === 0) && (
//       <li>No previous searches</li>
//     )}

//     {searchHistory?.map((item, index) => (
//       <li key={index}>{item}</li>
//     ))}
//   </ul>
// </div>


//       {loading && <h3>Loading...</h3>}
//       {error && <h3>{error}</h3>}

//       {filtered.map(user => (
//         <div className="card" key={user.id}>
//           <h4>{user.name}</h4>
//           <p>Email: {user.email}</p>
//         </div>
//       ))}
//     </>
//   );
// }




import React from "react";
import usePrevious from "../hooks/usePrevious";

export default function Users({
  data = [],
  loading = false,
  error = "",
  search,
  setSearch,
  saveSearch,         // now passed from App
  searchHistory = []  // default to empty array
}) {
  const previousSearch = usePrevious(search);

  const filtered = (data || []).filter(user =>
    (user.name || "").toLowerCase().includes((search || "").toLowerCase())
  );

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* safe call: if saveSearch not passed, nothing breaks */}
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

      {filtered.map(user => (
        <div className="card" key={user.id}>
          <h4>{user.name}</h4>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  );
}
