import { useEffect, useState } from "react";
import axios from "axios";
import UserRecipeCard from "./UserRecipeCard";

export default function CreatedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipesByUser = async () => {
      try {
        const userRes = await axios.get(
          "https://healthifyme-api.onrender.com/API/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const userID = userRes.data.userId;

        const recipesRes = await axios.get(
          "https://healthifyme-api.onrender.com/API/recipes/"
        );

        const filteredRecipes = recipesRes.data.filter(
          (recipe) => recipe.addedBy._id === userID
        );

        setRecipes(filteredRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    getRecipesByUser();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-extrabold">Created Recipes:</h1>
      <div className="container mx-auto">
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 mt-4 mb-4">
            {recipes.map((recipe) => (
              <UserRecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="my-4 md:my-8 lg:my-12 xl:my-24 text-2xl text-center">
            No added recipe
          </div>
        )}
      </div>
    </div>
  );
}
