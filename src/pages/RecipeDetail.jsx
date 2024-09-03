import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteRecipe from "../components/DeleteRecipe";
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
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container m-auto px-10 lg:px-0">
          <h1 className="text-4xl font-bold text-primary text-center pt-16">
            {recipe.name}
          </h1>
          <div className="flex flex-col flex-1 gap-4  px-8 pt-8 pb-4  py-12">
            {/*Section 1*/}
            <div className="flex  flex-1 gap-10 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
              <div className="flex justify-center relative overflow-hidden group cursor-pointer rounded-lg max-w-lg aspect-[1/1]">
                <img
                  src={imageUrl}
                  alt={description || "Recipe Image"}
                  onError={(e) => {
                    e.target.src = imageNotFound;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <div className="p-4 pb-8">
                <div className="capitalize absolute top-2 right-2 flex gap-2">
                  <div className="badge badge-secondary">
                    {recipe.dietaryTags[0] ?? "Other"}
                  </div>
                  <div className="badge badge-accent">
                    {recipe.dietaryTags[1] ?? "Other"}
                  </div>
                </div>
              </div> */}

              <div className="  flex flex-col justify-between gap-8 w-full min-h-full flex-1 ">
                <p className="text-2xl text-accent bg-secondary rounded-lg p-8 h-full ">
                  {recipe.description}
                </p>

                <div className="flex justify-between  ">
                  <p className="font-bold text-primary text-3xl bg-secondary rounded-lg p-4">
                    {ingredients.length} Ingredients
                  </p>
                  <p className="font-bold text-primary text-3xl bg-secondary rounded-lg p-4">
                    {Math.round(nutritionalInfo.calories ?? 0)} calories
                  </p>
                </div>
              </div>
            </div>

            {/*Section 2*/}
            <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
              <div className="p-4">
                <h3 className="font-bold text-lg">Ingredients:</h3>
                <ul className="list-disc list-inside">
                  {ingredients.map((ingredient) => (
                    <li
                      key={ingredient._id}
                      className="flex items-center space-x-2"
                    >
                      <span>{`${ingredient.quantity} ${ingredient.unit} of ${
                        ingredient.ingredientItem?.name || "Unknown"
                      }`}</span>
                    </li>
                  ))}
                </ul>{" "}
              </div>
            </div>

            {/*Section 3*/}
            <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
              <div className="p-4">
                <h3 className="font-bold text-lg mt-4">Steps:</h3>
                <ol className="list-decimal list-inside">
                  {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/*Section 4*/}
            <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
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
                <Link to={`/recipes/edit/${id}`}>
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Edit
                  </button>
                </Link>
                <DeleteRecipe />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
