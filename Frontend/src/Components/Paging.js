import React from 'react'

export default function Paging({ currentPage, totalPages, goToPage }) {
  return (
    <nav aria-label="Page navigation" className="flex items-center justify-center mt-5">
      <ul className="inline-flex -space-x-px text-sm">

        {/* Previous */}
        <li>
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="flex items-center justify-center h-8 px-3 bg-white border rounded-s-lg hover:bg-gray-100"
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <li key={page}>
              <button
                onClick={() => goToPage(page)}
                className={`px-3 h-8 border 
                  ${currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next */}
        <li>
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="flex items-center justify-center h-8 px-3 bg-white border rounded-e-lg hover:bg-gray-100"
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
}
