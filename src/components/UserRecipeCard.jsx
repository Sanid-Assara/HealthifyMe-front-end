import { Link } from "react-router-dom";
import imageNotFoundGreen from "../assets/imageNotFoundGreen.png";

export default function CardRecipe({ recipe }) {
  return (
    <div
      className="mb-4 bg-base-100 shadow-md relative rounded-lg border-2 border-secondary"
      key={recipe._id}
    >
      <div className="flex justify-center relative overflow-hidden group cursor-pointer rounded-tl-lg rounded-tr-lg aspect-[1/1]">
        <img
          src={recipe.imageUrl}
          alt={recipe.description}
          onError={(e) => {
            e.target.src = `${imageNotFoundGreen}`;
          }}
          className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
        />
        <Link to={`/recipes/details/${recipe._id}`}>
          <div className="bg-neutral text-primary text-5xl font-bold opacity-95 absolute bottom-0 left-0 right-0 text-center content-center h-full translate-y-full transition group-hover:translate-y-0">
            See Recipe
          </div>
        </Link>
      </div>
      <div className="p-4 pb-8">
        <div className="capitalize absolute top-2 right-2 flex gap-2">
          <div className="badge badge-secondary">
            {recipe.dietaryTags[0] ?? "Other"}
          </div>
          <div className="badge badge-accent">
            {recipe.dietaryTags[1] ?? "Other"}
          </div>
        </div>

        <p className="font-bold text-xl text-primary pb-2">{recipe.name}</p>
        <div className="card-actions justify-between">
          <p className="font-bold text-gray-800 text-lg">
            {recipe.ingredients.length} Ingredients
          </p>
          <p className="font-bold text-accent text-lg">
            {Math.round(recipe.nutritionalInfo.calories)} calories
          </p>
        </div>
      </div>
    </div>
  );
}
