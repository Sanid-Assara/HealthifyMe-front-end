import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AddRecipe() {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    ingredients: [{ ingredientItem: "", quantity: "", unit: "" }],
    steps: [""],
    imageUrl: "",
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    dietaryTags: [],
    addedBy: "",
  });
  const [ingredientsList, setIngredientsList] = useState([]);
  const [unitsList] = useState([
    "Grams",
    "Ounces",
    "Cups",
    "Tablespoons",
    "Teaspoons",
    "Liters",
    "Milliliters",
    "Pinch",
    "Pieces",
    "Slices",
    "Cloves",
    "Bunches",
  ]);
  const [showIngredientDropdown, setShowIngredientDropdown] = useState([]);
  const [showUnitDropdown, setShowUnitDropdown] = useState([]);
  const ingredientDropdownRefs = useRef([]);
  const unitDropdownRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://healthifyme-api.onrender.com/API/ingredients/`)
      .then((res) => {
        const idsAndNames = res.data.map((item) => ({
          id: item._id,
          name: item.name,
        }));
        setIngredientsList(idsAndNames);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ingredientDropdownRefs.current.some(
          (ref) => ref && ref.contains(event.target)
        )
      )
        return;
      if (
        unitDropdownRefs.current.some(
          (ref) => ref && ref.contains(event.target)
        )
      )
        return;
      setShowIngredientDropdown((prev) => prev.map(() => false));
      setShowUnitDropdown((prev) => prev.map(() => false));
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in newRecipe.nutritionalInfo) {
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        nutritionalInfo: {
          ...prevRecipe.nutritionalInfo,
          [name]: value,
        },
      }));
    } else if (name === "dietaryTags") {
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        dietaryTags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  };

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const ingredients = [...newRecipe.ingredients];
    ingredients[index][name] = value;
    setNewRecipe({ ...newRecipe, ingredients });
  };

  const handleStepChange = (index, e) => {
    const updatedSteps = [...newRecipe.steps];
    updatedSteps[index] = e.target.value;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: updatedSteps,
    }));
  };

  const addIngredient = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [
        ...newRecipe.ingredients,
        { ingredientItem: "", quantity: "", unit: "" },
      ],
    });
    setShowIngredientDropdown((prev) => [...prev, false]);
    setShowUnitDropdown((prev) => [...prev, false]);
  };

  const removeIngredient = (index) => {
    const ingredients = [...newRecipe.ingredients];
    ingredients.splice(index, 1);
    setNewRecipe({ ...newRecipe, ingredients });
    setShowIngredientDropdown((prev) => prev.filter((_, i) => i !== index));
    setShowUnitDropdown((prev) => prev.filter((_, i) => i !== index));
  };

  const handleIngredientSelect = (index, ingredient) => {
    const ingredients = [...newRecipe.ingredients];
    ingredients[index].ingredientItem = ingredient.id;
    setNewRecipe({ ...newRecipe, ingredients });
    setShowIngredientDropdown((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleUnitSelect = (index, unit) => {
    const ingredients = [...newRecipe.ingredients];
    ingredients[index].unit = unit;
    setNewRecipe({ ...newRecipe, ingredients });
    setShowUnitDropdown((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const addStep = () => {
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: [...prevRecipe.steps, ""],
    }));
  };

  const removeStep = (index) => {
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.filter((_, i) => i !== index),
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();

    axios
      .get("https://healthifyme-api.onrender.com/API/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        newRecipe.addedBy = res.data.userId;

        return axios.post(
          "https://healthifyme-api.onrender.com/API/recipes/",
          newRecipe
        );
      })
      .then((res) => {
        navigate(`/recipes/details/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="container m-auto px-10 lg:px-0">
        <h1 className="text-4xl font-bold text-primary text-center pt-16">
          Create a New Recipe
        </h1>
        <div className="flex items-center justify-center gap-6 py-12">
          <form
            onSubmit={handleCreate}
            className="flex flex-col flex-1 gap-4  px-8 pt-8 pb-4  py-12"
          >
            {/* Section 1*/}
            <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
              {/* Recipe Name and Cover Photo Section */}
              <div className="flex justify-around gap-8">
                {/* Recipe Name Section */}
                <div className="mb-4 flex-1">
                  <label
                    className="block  text-xl font-bold mb-2 text-primary"
                    htmlFor="name"
                  >
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newRecipe.name}
                    onChange={handleChange}
                    placeholder="Enter the recipe name"
                    className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                  />
                </div>

                {/* Cover Photo Section */}
                <div className="mb-4 flex-1">
                  <label
                    className="block text-primary text-xl font-bold mb-2"
                    htmlFor="imageUrl"
                  >
                    Cover Photo
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      value={newRecipe.imageUrl}
                      onChange={handleChange}
                      placeholder="Add image url"
                      className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                    />
                    <button className="btn btn-secondary text-primary font-bold hover:text-secondary hover:btn-primary border-2 border-primary">
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-4 flex-1">
                <label
                  className="block text-primary text-xl font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newRecipe.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                />
              </div>
            </div>

            {/* Section 2*/}
            <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
              <div className="flex flex-1 gap-8 ">
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
                    value={newRecipe.nutritionalInfo.calories}
                    onChange={handleChange}
                    min={0}
                    placeholder="Enter calories"
                    className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                  />
                </div>
                {/* Protein Section */}
                <div className="mb-4 flex-1">
                  <label
                    className="block text-primary text-xl font-bold mb-2"
                    htmlFor="protein"
                  >
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    id="protein"
                    name="protein"
                    value={newRecipe.nutritionalInfo.protein}
                    min={0}
                    onChange={handleChange}
                    placeholder="Enter protein"
                    className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                  />
                </div>
              </div>

              <div className="flex flex-1 gap-8">
                {/* Carbs Section */}
                <div className="mb-4 flex-1">
                  <label
                    className="block text-primary text-xl font-bold mb-2"
                    htmlFor="carbs"
                  >
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    id="carbs"
                    name="carbs"
                    value={newRecipe.nutritionalInfo.carbs}
                    onChange={handleChange}
                    min={0}
                    placeholder="Enter carbs"
                    className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                  />
                </div>
                {/* Fat Section */}
                <div className="mb-4 flex-1">
                  <label
                    className="block text-primary text-xl font-bold mb-2"
                    htmlFor="fat"
                  >
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    id="fat"
                    name="fat"
                    value={newRecipe.nutritionalInfo.fat}
                    onChange={handleChange}
                    min={0}
                    placeholder="Enter fat"
                    className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
                  />
                </div>
              </div>

              {/* Dietary Tags */}
              <div className="mb-4 flex-1">
                <label
                  className="block text-primary text-xl font-bold mb-2"
                  htmlFor="dietaryTags"
                >
                  Dietary Tags
                </label>
                <input
                  type="text"
                  id="dietaryTags"
                  name="dietaryTags"
                  onChange={handleChange}
                  placeholder="Separate tags with commas"
                  className="select-secondary w-full rounded-md bg-black/5 py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2"
                />
              </div>
            </div>

            {/* Section 3: Ingredients and Steps */}
            <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
              <div className="flex flex-1 gap-8">
                {/* Ingredients Section */}
                <div className="mb-4 basis-1/3 grow">
                  <h2 className="text-primary text-xl text-center font-bold mb-2">
                    Ingredients
                  </h2>
                  {newRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="mb-2 flex flex-col gap-4">
                      {/* Ingredient label */}
                      <label
                        className="block text-primary text-lg font-bold flex-1"
                        htmlFor={`ingredient-${index}`}
                      >
                        Ingredient {index + 1}
                      </label>

                      {/* Choose Ingredient */}
                      <div className="relative flex-1">
                        <input
                          type="text"
                          id={`ingredient-${index}`}
                          name="ingredientItem"
                          placeholder="Choose Ingredient"
                          value={
                            ingredientsList.find(
                              (item) => item.id === ingredient.ingredientItem
                            )?.name || ""
                          }
                          onFocus={() => {
                            const dropdowns = [...showIngredientDropdown];
                            dropdowns[index] = true;
                            setShowIngredientDropdown(dropdowns);
                          }}
                          readOnly
                          className="select select-secondary dropdown-arrow cursor-pointer block w-full rounded-md bg-black/5 py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 pr-8"
                        />
                        <div
                          ref={(ref) =>
                            (ingredientDropdownRefs.current[index] = ref)
                          }
                          className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto ${
                            showIngredientDropdown[index] ? "block" : "hidden"
                          }`}
                        >
                          {ingredientsList.map((item) => (
                            <li
                              key={item.id}
                              onClick={() =>
                                handleIngredientSelect(index, item)
                              }
                              className="cursor-pointer list-none text-primary px-4 py-2 hover:bg-secondary"
                            >
                              {item.name}
                            </li>
                          ))}
                          <Link
                            to="/ingredients/add"
                            className="bg-secondary text-primary hover:text-secondary  hover:bg-primary text-xl rounded-lg   m-1  font-bold  flex items-center justify-center  border-2 border-primary    cursor-pointer list-none  text-center"
                          >
                            <li>+</li>
                          </Link>
                        </div>
                        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-3 h-3 pointer-events-none">
                          <div className="w-0 h-0 border-l-2 border-l-transparent border-r-2 border-r-transparent border-t-3 border-t-primary"></div>
                        </div>
                      </div>

                      {/* Quantity and Units */}
                      <div className="flex gap-4 flex-1">
                        <div className="flex-1">
                          <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(index, e)}
                            className="select-secondary mt-2 block w-full rounded-md bg-black/5 py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2"
                            min={0}
                          />
                        </div>

                        <div className="relative mt-2 flex-1">
                          <input
                            type="text"
                            id={`unit-${index}`}
                            name="unit"
                            placeholder="Choose Unit"
                            value={ingredient.unit}
                            onFocus={() => {
                              const dropdowns = [...showUnitDropdown];
                              dropdowns[index] = true;
                              setShowUnitDropdown(dropdowns);
                            }}
                            readOnly
                            className="select select-secondary dropdown-arrow cursor-pointer block w-full rounded-md bg-black/5 py-3 pl-10 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 "
                          />
                          <div
                            ref={(ref) =>
                              (unitDropdownRefs.current[index] = ref)
                            }
                            className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto ${
                              showUnitDropdown[index] ? "block" : "hidden"
                            }`}
                          >
                            {unitsList.map((unit, unitIndex) => (
                              <li
                                key={unitIndex}
                                onClick={() => handleUnitSelect(index, unit)}
                                className="cursor-pointer list-none text-primary px-4 py-2 hover:bg-secondary"
                              >
                                {unit}
                              </li>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="btn btn-error  font-bold flex-1 text-white mb-4"
                      >
                        Remove Ingredient
                      </button>
                    </div>
                  ))}

                  {/* Add Button */}
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="btn btn-secondary text-4xl text-primary  font-bold text-center flex items-center justify-center pb-2 border-2 border-primary  hover:btn-primary hover:text-secondary"
                  >
                    +
                  </button>
                </div>

                {/* Steps Section */}
                <div className="mb-4 basis-2/3 grow">
                  <h2 className="text-primary text-xl text-center font-bold mb-2">
                    Step by Step
                  </h2>
                  {newRecipe.steps.map((step, index) => (
                    <div key={index} className="mb-2">
                      <label
                        className="block text-primary text-lg font-bold mb-2"
                        htmlFor={`step-${index}`}
                      >
                        Step {index + 1}
                      </label>
                      <div className="flex justify-start mt-4 gap-4">
                        <div className="w-full">
                          <input
                            className="select-secondary w-full rounded-md bg-black/5 py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2"
                            type="text"
                            id={`step-${index}`}
                            placeholder={`Enter Step ${index + 1}`}
                            value={step}
                            onChange={(e) => handleStepChange(index, e)}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeStep(index)}
                          className="btn btn-error  font-bold text-white mb-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addStep}
                    className="btn btn-secondary text-4xl text-primary  font-bold text-center flex items-center justify-center pb-2 border-2 border-primary  hover:btn-primary hover:text-secondary"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Create Recipe and Cancel Buttons */}
              <div className="flex justify-end gap-6 mt-8 mb-4">
                <button
                  type="submit"
                  className="bg-primary hover:bg-secondary text-secondary hover:text-primary border-2 border-primary hover:border-2  hover:border-primary text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
                >
                  Create
                </button>
                <Link to="/my-recipes">
                  <button className="bg-error hover:bg-white text-white hover:text-error border-2 border-error hover:border-2  hover:border-error text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3">
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
