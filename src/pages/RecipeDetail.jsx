import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteRecipe from "../components/DeleteRecipe";
import EditRecipe from "../components/EditRecipe";
import imageNotFound from "../assets/imageNotFound.png";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
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

  const {
    imageUrl = imageNotFound,
    description = "",
    name = "Unknown Recipe",
    dietaryTags = [],
    ingredients = [],
    steps = [],
    nutritionalInfo = {},
  } = recipe;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4 bg-base-100 shadow-md relative rounded-lg">
        <div className="flex justify-center relative overflow-hidden group cursor-pointer rounded-lg">
          <img
            src={imageUrl}
            alt={description || "Recipe Image"}
            onError={(e) => {
              e.target.src = imageNotFound;
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
          <p className="font-bold text-xl text-primary">{name}</p>
          <p className="text-lg text-secondary">{description}</p>

          <div className="capitalize absolute top-2 right-2">
            <div className="badge badge-secondary">
              {dietaryTags[0] ?? "Other"}
            </div>
            <div className="badge badge-accent">
              {dietaryTags[1] ?? "Other"}
            </div>
          </div>

          <div className="card-actions justify-between">
            <p>{ingredients.length} Ingredients</p>
            <p className="font-bold">
              {Math.round(nutritionalInfo.calories ?? 0)} calories
            </p>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {ingredients.map((ingredient) => (
              <li key={ingredient._id} className="flex items-center space-x-2">
                <span>{`${ingredient.quantity} ${ingredient.unit} of ${
                  ingredient.ingredientItem?.name || "Unknown"
                }`}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-bold text-lg mt-4">Steps:</h3>
          <ol className="list-decimal list-inside">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="p-4 flex space-x-4">
          <div className="text-center">
            <p className="text-sm font-bold">Protein</p>
            <p>{nutritionalInfo.protein ?? "N/A"}g</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">Carbs</p>
            <p>{nutritionalInfo.carbs ?? "N/A"}g</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">Fat</p>
            <p>{nutritionalInfo.fat ?? "N/A"}g</p>
          </div>
        </div>
        <div className="flex justify-around p-4">
          <EditRecipe />
          <DeleteRecipe />
        </div>
      </div>
    </div>
  );
}
