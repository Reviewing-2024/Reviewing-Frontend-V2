import '../../asserts/scss/component/_pagination.scss'

const Pagination = ({
  currentPage,
  onPageChange,
  totalPages
}) => {

  const maxVisible = 5;

  let startPage = Math.floor(
    (currentPage - 1) / maxVisible) * maxVisible + 1;

  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">

      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        ⏮
      </button>

      <button
        onClick={() => onPageChange(Math.max(1, startPage - 1))}
        disabled={startPage === 1}
      >
        ◀
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={
            currentPage === page
              ? 'active'
              : 'no_active'
          }
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, endPage + 1))}
        disabled={endPage === totalPages}
      >
        ▶
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={totalPages === 0 || currentPage === totalPages}
      >
        ⏭
      </button>

    </div>
  );
};

export default Pagination;