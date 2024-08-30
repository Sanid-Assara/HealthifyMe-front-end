import { Link } from "react-router-dom";
import imageNotFound from "../assets/imageNotFound.png";

export default function CardRecipe({ recipe }) {
  return (
    <>
      <div
        className="mb-4 bg-base-100 shadow-md relative rounded-lg"
        key={recipe._id}
      >
        <div className="flex justify-center relative overflow-hidden group cursor-pointer rounded-lg">
          <img
            src={recipe.imageUrl}
            alt={recipe.description}
            onError={(e) => {
              e.target.src = `${imageNotFound}`;
            }}
            className="w-full h-full object-cover"
          />
          <Link to={`/recipes/details/${recipe._id}`}>
            <div className="bg-neutral text-base-100 font-bold opacity-70 absolute bottom-0 left-0 right-0 text-center content-center h-full translate-y-full transition group-hover:translate-y-0">
              See recipe
            </div>
          </Link>
        </div>
        <div className="p-4 pb-8">
          <p className="font-bold text-xl text-primary">{recipe.name}</p>

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
      </div>
    </>
  );
}
