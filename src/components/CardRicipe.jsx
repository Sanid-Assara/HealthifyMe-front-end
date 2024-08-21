export default function CardRecipe({ recipe }) {
  return (
    <>
      <div
        className="mb-4 bg-base-100 shadow-md relative rounded-lg"
        key={recipe.uri}
      >
        <img src={recipe.image} alt={recipe.label} className="rounded-t-lg" />
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
