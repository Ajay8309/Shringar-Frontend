import React, {useState} from 'react';
import "./Nav/Nav.css"

const FilterWindow = ({ onClose, isFilterWindowOpen, onApply }) => {
 
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [materialType, setMaterialType] = useState('');

    const handleFilterApply = () => {
      const filters = { minPrice, maxPrice, categoryName, materialType };
      onApply(filters); 
    };

  return (
    <div className={`filterWindow ${isFilterWindowOpen ? 'open' : ''}`}>

    <button className="closeButton" onClick={onClose}>
      Close
    </button>

    <div className="filterContainer">
      <div className="filterItem">
        <label>
          Max Price:
          <input type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </label>
      </div>

      <div className="filterItem">
        <label>
          Min Price:
          <input type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </label>
      </div>

      <div className="filterItem">
        <label>
          Category Name:
          <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </label>
      </div>

      <div className="filterItem">
        <label>
          Material Type:
          <input type="text" value={materialType} onChange={(e) => setMaterialType(e.target.value)} />
        </label>
      </div>
    </div>


     
      <button onClick={handleFilterApply} className='applyFilters'>Apply Filters</button>
  </div>
  );
};

export default FilterWindow;
