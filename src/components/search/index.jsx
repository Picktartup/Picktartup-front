// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="search-bar flex items-center p-3 border rounded-lg shadow-md">
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
      className="flex-grow px-3 py-2 text-lg border-none outline-none"
    />
    <button
      onClick={onSearch}
      className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
    >
      검색
    </button>
  </div>
);

export default SearchBar;
