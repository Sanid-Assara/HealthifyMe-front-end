import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="container mx-auto">
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 mt-4 mb-4">
            {recipes.map((recipe) => (
              <UserRecipeCard key={recipe._id} recipe={recipe} />
            ))}
            <Link
              className="text-primary bg-secondary font-bold text-9xl mb-4  shadow-md relative rounded-lg border-4 border-primary text-center content-center cursor-pointer hover:text-secondary hover:bg-primary"
              to="/recipes/add"
            >
              <div>+</div>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 mt-4 mb-4 h-96">
            <Link
              className="text-primary bg-secondary font-bold text-9xl mb-4  shadow-md relative rounded-lg border-4 border-primary text-center content-center cursor-pointer hover:text-secondary hover:bg-primary"
              to="/recipes/add"
            >
              <div>+</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
