import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import imageNotFound from "../assets/imageNotFound.png";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null); // Initialize with null instead of an empty array
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://healthifyme-api.onrender.com/API/recipes/${id}`)
      .then((res) => {
        console.log(res.data);
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4 bg-base-100 shadow-md relative rounded-lg mt-8">
        <div className="flex justify-center relative overflow-hidden group cursor-pointer rounded-lg max-w-2xl">
          <img
            src={recipe.imageUrl}
            alt={recipe.description}
            onError={(e) => {
              e.target.src = `${imageNotFound}`;
            }}
            className="w-full h-full object-cover"
          />
          <Link to={`/profile`}>
            <div className="text-5xl bg-neutral text-base-100 font-bold opacity-70 absolute bottom-0 left-0 right-0 text-center content-center h-full translate-y-full transition group-hover:translate-y-0">
              Go back
            </div>
          </Link>
        </div>

        <div className="p-4 pb-8">
          <p className="font-bold text-xl text-primary">{recipe.name}</p>
          <p className="text-lg text-[#FF9002]">{recipe.description}</p>
          <p className="font-bold text-xl text-primary">
            Created by: {recipe.addedBy?.firstname || "Unknown"}
          </p>

          <div className="capitalize absolute top-2 right-2">
            <div className="badge badge-secondary">
              {recipe.dietaryTags[0] ?? "Other"}
            </div>
            <div className="badge badge-accent">
              {recipe.dietaryTags[1] ?? "Other"}
            </div>
          </div>

          <div className="card-actions justify-between">
            <p>{recipe.ingredients.length} Ingredients</p>
            <p className="font-bold">
              {Math.round(recipe.nutritionalInfo.calories)} calories
            </p>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient._id} className="flex items-center space-x-2">
                <span>{`${ingredient.quantity} ${ingredient.unit} of ${ingredient.foodItem.name}`}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-bold text-lg mt-4">Steps:</h3>
          <ol className="list-decimal list-inside">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Shared with the community:{" "}
              {recipe.sharedWithCommunity ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500">
              Added on: {new Date(recipe.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="p-4 flex space-x-4">
          <div className="text-center">
            <p className="text-sm font-bold">Protein</p>
            <p>{recipe.nutritionalInfo.protein}g</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">Carbs</p>
            <p>{recipe.nutritionalInfo.carbs}g</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">Fat</p>
            <p>{recipe.nutritionalInfo.fat}g</p>
          </div>
        </div>
      </div>
    </div>
  );
}
