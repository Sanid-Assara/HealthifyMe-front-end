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
      <div className="min-h-screen bg-gray-100 px-4">
        <div className="container m-auto px-10 lg:px-0">
          <h1 className="text-4xl font-bold text-primary text-center pt-16">
            {recipe.name}
          </h1>
          <div className="flex flex-col flex-1 gap-4  px-8 pt-8 pb-4  py-12">
            {/*Section 1*/}
            <div className="flex  flex-1 gap-10 bg-white px-8 pt-8 pb-8 mb-4 shadow appearance-none border rounded leading-tight py-12">
              <div className="flex justify-center relative overflow-hidden group  rounded-lg max-w-lg aspect-[1/1]">
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

              <div className="  flex flex-col justify-between gap-10 w-full min-h-full flex-1 ">
                <p className="text-2xl text-primary bg-secondary rounded-lg p-8 h-full ">
                  {recipe.description}
                </p>

                <div className="flex justify-between  ">
                  <p className="font-bold text-primary text-xl bg-secondary rounded-lg p-4">
                    {ingredients.length} Ingredients
                  </p>
                  <p className="font-bold text-accent text-xl bg-secondary rounded-lg p-4">
                    {Math.round(nutritionalInfo.calories ?? 0)} kilocalorie
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-8 mb-4">
              {/*Section 2*/}
              <div className="flex flex-col flex-1 bg-white px-8 pt-2 pb-4 shadow appearance-none border rounded leading-tight py-12">
                <div className="p-4">
                  <h3 className="font-bold text-4xl text-center text-primary ">
                    Ingredients
                  </h3>
                  <ul className="grid  grid-cols-2 gap-2 pt-6 text-center">
                    {ingredients.map((ingredient) => (
                      <li
                        key={ingredient._id}
                        className="flex items-center justify-center text-center  font-bold text-accent text-lg bg-secondary rounded-lg p-2 "
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
              <div className="flex flex-col flex-1 bg-white  pt-2 pb-4 shadow appearance-none border rounded leading-tight py-12 px-8 ">
                <div className="p-4">
                  <h3 className="font-bold text-4xl text-center text-primary">
                    Steps
                  </h3>
                  <ol className=" grid  grid-cols-1 gap-2 pt-6  list-decimal">
                    {steps.map((step, index) => (
                      <div className="flex gap-2 " key={index}>
                        <p className=" text-center px-5  flex items-center justify-center    font-bold text-primary text-lg bg-secondary rounded-lg  ">
                          {index + 1}
                        </p>
                        <li className=" flex items-center justify-start  pl-4  font-bold text-accent text-lg bg-secondary rounded-lg p-2 w-full">
                          {step}
                        </li>
                      </div>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/*Section 4*/}
            <div className="flex justify-between items-center bg-white px-8 pt-6 pb-4 shadow appearance-none border rounded leading-tight py-12 mb-4">
              <div className="flex flex-col justify-center items-center  flex-1">
                <div className="flex justify-center items-center ">
                  <h3 className="font-bold text-4xl text-center text-primary">
                    Nutritional Info
                  </h3>
                </div>
                <div className="p-4 flex space-x-4">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-center px-5  flex items-center justify-center    font-bold text-primary text-lg bg-secondary rounded-lg">
                      Protein
                    </p>
                    <p className="flex items-center justify-center  px-5  font-bold text-accent text-lg bg-secondary rounded-lg  w-full">
                      {nutritionalInfo.protein ?? "N/A"}g
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-center px-5  flex items-center justify-center    font-bold text-primary text-lg bg-secondary rounded-lg">
                      Carbs
                    </p>
                    <p className="flex items-center justify-center  px-5  font-bold text-accent text-lg bg-secondary rounded-lg  w-full">
                      {nutritionalInfo.carbs ?? "N/A"}g
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-center px-5  flex items-center justify-center    font-bold text-primary text-lg bg-secondary rounded-lg">
                      Fat
                    </p>
                    <p className="flex items-center justify-center  px-5  font-bold text-accent text-lg bg-secondary rounded-lg  w-full">
                      {nutritionalInfo.fat ?? "N/A"}g
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end items-end flex-1 self-end mb-2">
                <Link
                  className="bg-primary hover:bg-secondary text-secondary hover:text-primary border-2 border-primary hover:border-2  hover:border-primary text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
                  to={`/recipes/edit/${id}`}
                >
                  <button>Edit</button>
                </Link>
                <Link
                  className=" bg-accent hover:bg-white text-white hover:text-accent border-2 border-accent hover:border-2  hover:border-accent text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
                  to={`/my-recipes`}
                >
                  <button>Go Back</button>
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
