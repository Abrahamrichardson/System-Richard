export default function Pagination({ total, page, setPage }) {
  const totalPages = Math.ceil(total / 5);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <span>{page} / {totalPages}</span>

      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
