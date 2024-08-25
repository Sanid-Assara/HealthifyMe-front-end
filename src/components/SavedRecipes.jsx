import { useEffect, useState } from "react";
import axios from "axios";
import UserRecipeCard from "./UserRecipeCard";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`https://healthifyme-api.onrender.com/API/recipes/`)
      .then((res) => {
        console.log(res.data);

        setRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1>Saved Recipes:</h1>
      <div className="container m-auto min-h-screen py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
          {recipes.map((rec) => (
            <UserRecipeCard key={rec.id} recipe={rec} />
          ))}
        </div>
      </div>
    </>
  );
}
