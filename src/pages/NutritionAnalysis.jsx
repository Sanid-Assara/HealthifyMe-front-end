import { useEffect, useState } from "react";
import axios from "axios";

export default function NutriAnalysis() {
  const [search, setSearch] = useState(null);

  function handleSearch(e) {
    e.preventdefault();
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 text-center pt-16">
          Nutrition Analysis
        </h1>
        <div className="flex items-center justify-center gap-6 py-12">
          <label className="input input-bordered flex items-center w-full max-w-md gap-2">
            <input type="text" className="grow" placeholder="Search" />
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
          </label>
          <select className="select select-bordered w-full max-w-56">
            <option disabled selected>
              Diet
            </option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
          </select>
          <select className="select select-bordered w-full max-w-56">
            <option disabled selected>
              Allergies
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
          <div className="form-control">
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox checkbox-secondary" />
              <span className="label-text pl-2">Advance options </span>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 py-12"></div>
        <div className="container m-auto grid grid-cols-4 gap-6"></div>
      </div>
    </>
  );
}
