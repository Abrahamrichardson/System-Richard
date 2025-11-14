export default function Tabs({ active, setActive }) {
  return (
    <div className="tabs">
      <button
        className={active === "users" ? "active" : ""}
        onClick={() => setActive("users")}
      >
        Users
      </button>

      <button
        className={active === "todos" ? "active" : ""}
        onClick={() => setActive("todos")}
      >
        Todos
      </button>
    </div>
  );
}
