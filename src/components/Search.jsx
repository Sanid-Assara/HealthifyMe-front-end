import React, { useState, useContext } from "react";
import { SearchContext } from "../context/SearchProvider";

export default function Search() {
  const { search, updateSearch, handleSearch } = useContext(SearchContext);

  const dietOptions = [
    { value: "", text: "Select a diet" },
    { value: "vegetarian", text: "Vegetarian" },
    { value: "vegan", text: "Vegan" },
    { value: "high-fiber", text: "High-Fiber" },
    { value: "high-protein", text: "High-Protein" },
    { value: "low-carb", text: "Low-Carb" },
    { value: "low-fat", text: "Low-Fat" },
    { value: "low-sodium", text: "Low-Sodium" },
    { value: "low-sugar", text: "Low-Sugar" },
    { value: "alcohol-free", text: "Alcohol-Free" },
    { value: "balanced", text: "Balanced" },
    { value: "immunity", text: "Immunity" },
  ];

  const [selected, setSelected] = useState(dietOptions[0].value);

  const allergieOptions = [
    { value: "", text: "Allergies" },
    { value: "gluten", text: "Gluten" },
    { value: "eggs", text: "Eggs" },
    { value: "soy", text: "Soy" },
    { value: "wheat", text: "Wheat" },
    { value: "fish", text: "fish" },
    { value: "shellfish", text: "Shellfish" },
    { value: "nuts", text: "Nuts" },
    { value: "peanuts", text: "Peanuts" },
  ];

  const [selectedAllergie, setSelectedAllergie] = useState(
    allergieOptions[0].value
  );

  const handleDiet = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  const handleAllergie = (e) => {
    console.log(e.target.value);
    setSelectedAllergie(e.target.value);
  };

  console.log(search);
  return (
    <>
      <div className="py-12">
        <form onSubmit={handleSearch} className="flex justify-center gap-x-6">
          <label className="input input-bordered select-secondary flex items-center gap-2 pr-0">
            <input
              type="text"
              id="search"
              value={search}
              className="grow"
              placeholder="Search recipes..."
              onChange={updateSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <button className="btn btn-secondary" type="submit">
              Search
            </button>
          </label>
          <select
            className="select select-secondary w-40 max-w-xs"
            id="diet"
            value={selected}
            onChange={handleDiet}
          >
            {dietOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <select
            className="select select-secondary w-40 max-w-xs"
            id="allergies"
            value={selectedAllergie}
            onChange={handleAllergie}
          >
            {allergieOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
}
