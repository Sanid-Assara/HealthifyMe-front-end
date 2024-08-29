import { Link } from "react-router-dom";

export default function CardRecipe({ recipe }) {
  const id = recipe.uri.substr(recipe.uri.length - 32);
  return (
    <>
      <div
        className="mb-4 bg-base-100 shadow-md relative rounded-lg"
        key={recipe.uri}
      >
        <div className="flex justify-center relative overflow-hidden group cursor-pointer rounded-lg">
          <img
            src={recipe.image}
            alt={recipe.label}
            className="w-full h-full object-cover"
          />
          <Link to={`/recipes/${id}`}>
            <div className="bg-neutral text-base-100 font-bold opacity-70 absolute bottom-0 left-0 right-0 text-center content-center h-full translate-y-full transition group-hover:translate-y-0">
              See recipe
            </div>
          </Link>
        </div>
        <div className="p-4 pb-8">
          <p className="font-bold text-xl text-primary">{recipe.label}</p>
          <div className="capitalize absolute top-2 right-2">
            <div className="badge badge-secondary">
              {recipe.healthLabels[0]}
            </div>
            <div className="badge badge-accent">{recipe.healthLabels[1]}</div>
          </div>

          <div className="card-actions justify-between">
            <p>{recipe.ingredientLines.length} Ingredients</p>
            <p className="font-bold">{Math.round(recipe.calories)} calories</p>
          </div>
        </div>
      </div>
    </>
  );
}
