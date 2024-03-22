import React, { useState } from "react";
import "./Dropdown.css";

function Dropdown({ dropdownName, items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItem, setSelectedItem] = useState(null);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function handleInputChange(event) {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredItems(items.filter((item) => item.toLowerCase().includes(term)));
  }

  function handleItemClick(item) {
    onSelect(item);
    toggleDropdown();
    setSelectedItem(item);
  }

  return (
    <div className="relative group">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-between w-full px-4 p-2 text-sm font-medium text-gray-200 bg-[#224957] border-[#163545] rounded-md shadow-sm focus:outline-none"
      >
        <span className="mr-2">
          {selectedItem ? selectedItem : dropdownName}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        id="dropdown-menu"
        className={`w-full max-h-[200px] overflow-auto absolute right-0 mt-2 rounded-md shadow-lg bg-[#224957] ring-1 ring-[#092C39] ring-opacity-5 p-1 space-y-1 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <input
          id="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 text-gray-200 border rounded-md  border-[#092C39] focus:outline-none bg-[#163545]"
          type="text"
          autoComplete="off"
        />
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className={`block px-4 py-2 text-gray-200 hover:bg-[#092C39] cursor-pointer rounded-md ${
              item === selectedItem ? "bg-[#163545]" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
