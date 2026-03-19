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
        onClick={() => onPageChange(startPage - 5)}
        disabled={currentPage === 1}
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
        onClick={() => onPageChange(endPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▶
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        ⏭
      </button>

    </div>
  );
};

export default Pagination;