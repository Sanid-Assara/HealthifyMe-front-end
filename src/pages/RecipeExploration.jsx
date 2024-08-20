import { useEffect, useState } from "react";
import axios from "axios";
import CardRecipe from "../components/CardRicipe";
import SkeletonCard from "../components/SkeletonCard";

export default function RecipeExploration() {
  const [recipe, setRecipe] = useState([]);
  let qInput = "avocado";

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${qInput}&app_id=${
          import.meta.env.VITE_APP_ID
        }&app_key=${import.meta.env.VITE_APP_KEY}`
      )
      .then((res) => {
        setRecipe(res.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container m-auto px-10 lg:px-0">
          <h1 className="text-4xl font-bold text-red-600 text-center pt-16">
            Recipe Exploration
          </h1>
          <div className="flex items-center justify-center gap-6 py-12">
            <label className="input input-bordered flex items-center gap-2">
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
            {/* <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text pr-4">Advance options </span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                />
              </label>
            </div> */}
          </div>
          {recipe.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {recipe.map((r) => (
                  <CardRecipe key={r.recipe.uri} recipe={r.recipe} />
                ))}
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
