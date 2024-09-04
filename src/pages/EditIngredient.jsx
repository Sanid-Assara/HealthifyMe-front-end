import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditIngredient() {
  const { id } = useParams();
  const [ingredientEdit, setIngredientEdit] = useState({
    name: "",
    brand: "",
    macronutrients: {
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    addedBy: "",
    calories: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://healthifyme-api.onrender.com/API/ingredients/${id}`)
      .then((res) => {
        setIngredientEdit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["protein", "carbs", "fat"].includes(name)) {
      setIngredientEdit((prevIngredient) => ({
        ...prevIngredient,
        macronutrients: {
          ...prevIngredient.macronutrients,
          [name]: Number(value),
        },
      }));
    } else {
      setIngredientEdit((prevIngredient) => ({
        ...prevIngredient,
        [name]: value,
      }));
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://healthifyme-api.onrender.com/API/ingredients/${id}`,
        ingredientEdit
      )
      .then((res) => {
        navigate(`/ingredients/details/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="container m-auto px-10 lg:px-0">
        <h1 className="text-4xl font-bold text-primary text-center pt-16">
          Edit Your Ingredient
        </h1>
        <div className="flex items-center justify-center gap-6 py-12">
          <form
            onSubmit={handleEdit}
            className="flex flex-row-reverse flex-1 gap-4  px-8 pt-8 pb-4  py-1"
          >
            {/* Section 1*/}
            <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
              {/* Ingredient Name and Brand Name Section */}
              <div className="flex flex-col justify-between gap-8  h-full">
                <div>
                  {/* Ingredient Name Section */}
                  <div className="mb-4 flex-1">
                    <label
                      className="block  text-xl font-bold mb-2 text-primary"
                      htmlFor="name"
                    >
                      Ingredient Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={ingredientEdit.name}
                      onChange={handleChange}
                      placeholder="Enter ingredient name"
                      className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                    />
                  </div>

                  {/* Brand Name Section */}
                  <div className="mb-4 flex-1">
                    <label
                      className="block  text-xl font-bold mb-2 text-primary"
                      htmlFor="name"
                    >
                      Brand Name
                    </label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={ingredientEdit.brand}
                      onChange={handleChange}
                      placeholder="Enter brand name"
                      className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                    />
                  </div>
                </div>
                {/* Create Recipe and Cancel Buttons */}
                <div className="flex justify-end gap-6 mt-8 mb-4 self-end">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-secondary text-secondary hover:text-primary border-2 border-primary hover:border-2  hover:border-primary text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
                  >
                    Save
                  </button>
                  <Link
                    to={`/ingredients/details/${id}`}
                    className="bg-error hover:bg-white text-white hover:text-error border-2 border-error hover:border-2  hover:border-error text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 2*/}
            <div className="flex flex-col justify-start  flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
              <div className="flex flex-col flex-1 ">
                {/* Calories Section */}
                <div className="mb-4 flex-1">
                  <label
                    className="block text-primary text-xl font-bold mb-2"
                    htmlFor="calories"
                  >
                    Calories
                  </label>
                  <input
                    type="number"
                    id="calories"
                    name="calories"
                    min={0}
                    value={ingredientEdit?.calories ?? ""}
                    onChange={handleChange}
                    placeholder="Enter calorie amount"
                    className="select-secondary w-full rounded-md bg-black/5 py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2"
                  />
                </div>
                {/* Protein Section */}
                <div className="mb-4 flex-1">
                  <label
                    className="block text-primary text-xl font-bold mb-2"
                    htmlFor="protein"
                  >
                    Protein
                  </label>
                  <input
                    type="number"
                    id="protein"
                    name="protein"
                    min={0}
                    value={ingredientEdit?.macronutrients.protein ?? ""}
                    onChange={handleChange}
                    placeholder="Enter protein amount"
                    className="select-secondary w-full rounded-md bg-black/5 py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 ">
                {/* Carbs Section */}
                <div className="mb-4 flex-1">
                  <label
                    className="block text-primary text-xl font-bold mb-2"
                    htmlFor="carbs"
                  >
                    Carbs
                  </label>
                  <input
                    type="number"
                    id="carbs"
                    name="carbs"
                    min={0}
                    value={ingredientEdit?.macronutrients.carbs ?? ""}
                    onChange={handleChange}
                    placeholder="Enter carbs amount"
                    className="select-secondary w-full rounded-md bg-black/5 py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2"
                  />
                </div>
                {/* Fat Section */}
                <div className="mb-4 flex-1">
                  <label
                    className="block text-primary text-xl font-bold mb-2"
                    htmlFor="fat"
                  >
                    Fat
                  </label>
                  <input
                    type="number"
                    id="fat"
                    name="fat"
                    min={0}
                    value={ingredientEdit?.macronutrients.fat ?? ""}
                    onChange={handleChange}
                    placeholder="Enter fat amount"
                    className="select-secondary w-full rounded-md bg-black/5 py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
