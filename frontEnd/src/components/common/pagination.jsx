const Pagination = ({ currentPage, lastPage, setCurrentPage }) => {
  // Pagination controls
  let pageNumbers = [
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    lastPage,
  ].filter(
    (num, index, self) =>
      num >= 1 && num <= lastPage && self.indexOf(num) === index
  );

  return (
    <nav className="mt-5" aria-label="pagination-nav">
      <ul className="pagination justify-content-center">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="page-link"
          >
            Previous
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((num, index) => (
          <li
            className={currentPage === num ? "page-item active" : "page-item"}
            key={index}
          >
            <button className="page-link" onClick={() => setCurrentPage(num)}>
              {num}
            </button>
          </li>
        ))}

        {/* Next button */}
        <li className={`page-item ${currentPage === lastPage && "disabled"}`}>
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, lastPage))}
            className="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
