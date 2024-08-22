import React, { useState } from "react";

export default function Search({ search, updateSearch, handleSearch }) {
  const dietOptions = [
    { value: "", text: "Select a diet" },
    { value: "vegetarian", text: "Vegetarian" },
    { value: "vegan", text: "Vegan" },
    { value: "high-fiber", text: "High-Fiber" },
    { value: "high-protein", text: "High-Protein" },
    { value: "low-carb", text: "Low-Carb" },
    { value: "low-fat", text: "Low-Fat" },
    { value: "low-sodium", text: "Low-Sodium" },
    { value: "high-fiber", text: "High-Fiber" },
    { value: "low-sugar", text: "Low-Sugar" },
    { value: "alcohol-free", text: "Alcohol-Free" },
    { value: "balanced", text: "Balanced" },
    { value: "immunity", text: "Immunity" },
  ];

  const allergiesOptions = [];

  const [selected, setSelected] = useState(dietOptions[0].value);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
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
            onChange={handleChange}
          >
            {dietOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
            {/* <option disabled selected>
              Select Diet
            </option>
            <option value="Vegetarian">Vegetarian </option>
            <option value="Vegan">Vegan </option>
            <option value="High-Fiber">High-Fiber</option>
            <option value="High-Protein">High-Protein</option>
            <option value="Low-Carb">Low-Carb</option>
            <option value="Low-Fat">Low-Fat </option>
            <option value="Low-Sodium">Low-Sodium </option>
            <option value="Low-Sugar">Low-Sugar</option>
            <option value="Alcohol-Free">Alcohol-Free </option>
            <option value="Balanced">Balanced</option>
            <option value="Immunity">Immunity</option> */}
          </select>
          <select
            className="select select-secondary w-40 max-w-xs"
            id="allergies"
          >
            <option disabled selected>
              Allergies
            </option>

            <option>Gluten </option>
            <option>Eggs </option>
            <option>Soy </option>
            <option>Wheat </option>
            <option>Fish </option>
            <option>Shellfish </option>
            <option>Tree </option>
            <option>Nuts </option>
            <option>Peanuts</option>
          </select>
          {/* <div className="form-control">
            <label className="cursor-pointer label mx-4">
              Advance options
              <input
                type="checkbox"
                className="checkbox checkbox-secondary ml-2"
              />
            </label>
          </div> */}
        </form>
      </div>
    </>
  );
}
