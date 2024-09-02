import { useEffect, useRef, useState, useContext } from "react";
import Search from "../components/Search";
import CardRecipe from "../components/CardRicipe";
import SkeletonCard from "../components/SkeletonCard";
import { SearchContext } from "../context/SearchProvider";
import { Link } from "react-router-dom";

export default function RecipeExploration() {
  const {
    recipes,
    query,
    selectedDiet,
    selectedHealth,
    nextPage,
    nextRecipes,
  } = useContext(SearchContext);

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <div className="container m-auto px-10 lg:px-0">
          <h1 className="text-4xl font-bold text-primary text-center pt-16">
            Recipe Exploration
          </h1>
          <Search />
          <p className="text-center text-xl mb-10">
            Your results for recipes with{" "}
            <b>
              {query} {selectedDiet} {selectedHealth}
            </b>
          </p>
          {recipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {recipes.map((r) => (
                  <CardRecipe key={r.recipe.uri} recipe={r.recipe} />
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {nextRecipes.map((r) => (
                  <CardRecipe key={r.recipe.uri} recipe={r.recipe} />
                ))}
              </div>

              <div className="join flex justify-center lg:justify-evenly py-10">
                <button className="join-item btn btn-secondary w-36">
                  More
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
