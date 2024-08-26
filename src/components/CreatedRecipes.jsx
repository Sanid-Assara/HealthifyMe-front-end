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
    <>
      <h1 className="text-4xl font-extrabold">Created Recipes:</h1>
      <div className="container m-auto min-h-screen py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
          {recipes.map((recipe) => (
            <UserRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}
