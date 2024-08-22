import { useEffect, useState } from "react";
import axios from "axios";
import CardRecipe from "../components/CardRicipe";
import SkeletonCard from "../components/SkeletonCard";

export default function RecipeExploration() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Vegan");

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  function handleSearch(e) {
    e.preventDefault();
    setQuery(search);
    console.log(search);
    setSearch("");
  }

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${
          import.meta.env.VITE_APP_ID
        }&app_key=${import.meta.env.VITE_APP_KEY}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container m-auto px-10 lg:px-0">
          <h1 className="text-4xl font-bold text-neutral text-center pt-16">
            Recipe Exploration
          </h1>
          <div className="flex items-center justify-center gap-6 py-12">
            <form onSubmit={handleSearch} className="flex">
              <label className="input input-bordered flex items-center gap-2 pr-0">
                <input
                  type="text"
                  id="search"
                  className="grow"
                  value={search}
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
          {recipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {recipes.map((r) => (
                  <CardRecipe key={r.recipe.uri} recipe={r.recipe} />
                ))}
              </div>
              <div className="join flex justify-between lg:justify-evenly py-10">
                <button className="join-item btn btn-secondary w-28">
                  « Prev
                </button>
                <button className="join-item btn btn-secondary w-28">
                  Next »
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// (
//   <div className="mb-4" key={r.recipe.uri}>
//     <img src={r.recipe.image} alt="" />
//     <p className="font-bold text-xl">{r.recipe.label}</p>
//     <p>{r.recipe.cuisineType}</p>
//     <p>{r.recipe.dietLabels}</p>

//     <button>See more</button>
//   </div>
// )
