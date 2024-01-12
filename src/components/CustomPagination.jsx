import React from 'react';
import '../pages/ProductList/ProductList.css'; 

const CustomPagination = ({ totalResults, resultsPerPage, currentPage, onChange }) => {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
  
    const handleClick = (page) => {
      if (page >= 1 && page <= totalPages) {
        onChange(page);
        window.scrollTo({ behavior: 'smooth', top: 0 });
      }
    };
  
    return (
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pagination-button ${currentPage === index + 1 ? 'pagination-button-active' : ''}`}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-button"
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default CustomPagination;