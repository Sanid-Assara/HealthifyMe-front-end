import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function RecipeEdit() {
  const { id } = useParams();
  const [recipeEdit, setRecipeEdit] = useState({
    name: "",
    description: "",
    ingredients: [{ ingredientItem: "", quantity: "", unit: "" }],
    steps: [],
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
      .get(`https://healthifyme-api.onrender.com/API/recipes/${id}`)
      .then((res) => {
        setRecipeEdit(res.data);
        setShowIngredientDropdown(
          new Array(res.data.ingredients.length).fill(false)
        ); // Initialize ingredient dropdown state
        setShowUnitDropdown(new Array(res.data.ingredients.length).fill(false)); // Initialize unit dropdown state
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
    const handleClickOutside = (event) => {
      if (
        ingredientDropdownRefs.current &&
        !ingredientDropdownRefs.current.some(
          (ref) => ref && ref.contains(event.target)
        )
      ) {
        setShowIngredientDropdown(
          new Array(recipeEdit.ingredients.length).fill(false)
        );
      }
      if (
        unitDropdownRefs.current &&
        !unitDropdownRefs.current.some(
          (ref) => ref && ref.contains(event.target)
        )
      ) {
        setShowUnitDropdown(
          new Array(recipeEdit.ingredients.length).fill(false)
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [recipeEdit.ingredients.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in recipeEdit.nutritionalInfo) {
      setRecipeEdit((prevRecipe) => ({
        ...prevRecipe,
        nutritionalInfo: {
          ...prevRecipe.nutritionalInfo,
          [name]: value,
        },
      }));
    } else if (name === "dietaryTags") {
      setRecipeEdit((prevRecipe) => ({
        ...prevRecipe,
        dietaryTags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setRecipeEdit((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  };

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const ingredients = [...recipeEdit.ingredients];
    ingredients[index][name] = value;
    setRecipeEdit({ ...recipeEdit, ingredients });
  };

  const handleStepChange = (index, e) => {
    const updatedSteps = [...recipeEdit.steps];
    updatedSteps[index] = e.target.value;
    setRecipeEdit((prevRecipe) => ({
      ...prevRecipe,
      steps: updatedSteps,
    }));
  };

  const addIngredient = () => {
    setRecipeEdit({
      ...recipeEdit,
      ingredients: [
        ...recipeEdit.ingredients,
        { ingredientItem: "", quantity: "", unit: "" },
      ],
    });
    setShowIngredientDropdown([...showIngredientDropdown, false]); // Add a new ingredient dropdown state
    setShowUnitDropdown([...showUnitDropdown, false]); // Add a new unit dropdown state
  };

  const removeIngredient = (index) => {
    const ingredients = [...recipeEdit.ingredients];
    ingredients.splice(index, 1);
    setRecipeEdit({ ...recipeEdit, ingredients });
    const ingredientDropdowns = [...showIngredientDropdown];
    ingredientDropdowns.splice(index, 1);
    setShowIngredientDropdown(ingredientDropdowns); // Remove the corresponding ingredient dropdown state
    const unitDropdowns = [...showUnitDropdown];
    unitDropdowns.splice(index, 1);
    setShowUnitDropdown(unitDropdowns); // Remove the corresponding unit dropdown state
  };

  const handleIngredientSelect = (index, ingredient) => {
    const ingredients = [...recipeEdit.ingredients];
    ingredients[index].ingredientItem = ingredient.id;
    setRecipeEdit({ ...recipeEdit, ingredients });

    const dropdowns = [...showIngredientDropdown];
    dropdowns[index] = false;
    setShowIngredientDropdown(dropdowns); // Hide ingredient dropdown after selection
  };

  const handleUnitSelect = (index, unit) => {
    const ingredients = [...recipeEdit.ingredients];
    ingredients[index].unit = unit;
    setRecipeEdit({ ...recipeEdit, ingredients });

    const dropdowns = [...showUnitDropdown];
    dropdowns[index] = false;
    setShowUnitDropdown(dropdowns); // Hide unit dropdown after selection
  };

  const addStep = () => {
    setRecipeEdit((prevRecipe) => ({
      ...prevRecipe,
      steps: [...prevRecipe.steps, ""],
    }));
  };

  const removeStep = (index) => {
    setRecipeEdit((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`https://healthifyme-api.onrender.com/API/recipes/${id}`, recipeEdit)
      .then((res) => {
        navigate(`/recipes/details/${id}`);
        console.log("Recipe updated successfully", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Edit Recipe</h1>
        <form
          onSubmit={handleEdit}
          className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="name"
            >
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipeEdit.name}
              onChange={handleChange}
              placeholder="Enter recipe name"
              className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={recipeEdit.description}
              onChange={handleChange}
              placeholder="Enter description"
              className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="imageUrl"
            >
              Cover Photo
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={recipeEdit.imageUrl}
              onChange={handleChange}
              placeholder="Add image url"
              className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="calories"
            >
              Calories
            </label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={recipeEdit.nutritionalInfo.calories}
              onChange={handleChange}
              placeholder="Enter calorie amount"
              className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="protein"
            >
              Protein (g)
            </label>
            <input
              type="number"
              id="protein"
              name="protein"
              value={recipeEdit.nutritionalInfo.protein}
              onChange={handleChange}
              placeholder="Enter protein amount"
              className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="carbs"
            >
              Carbs (g)
            </label>
            <input
              type="number"
              id="carbs"
              name="carbs"
              value={recipeEdit.nutritionalInfo.carbs}
              onChange={handleChange}
              placeholder="Enter carbs amount"
              className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="fat"
            >
              Fat (g)
            </label>
            <input
              type="number"
              id="fat"
              name="fat"
              value={recipeEdit.nutritionalInfo.fat}
              onChange={handleChange}
              placeholder="Enter fat amount"
              className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="dietaryTags"
            >
              Dietary Tags
            </label>
            <input
              type="text"
              id="dietaryTags"
              name="dietaryTags"
              value={recipeEdit.dietaryTags.join(", ")}
              onChange={handleChange}
              placeholder="Separate tags with commas"
              className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
            />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            {recipeEdit.ingredients.map((ingredient, index) => (
              <div key={index} className="mb-2">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor={`ingredient-${index}`}
                >
                  Ingredient {index + 1}
                </label>
                <div className="relative">
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
                    className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
                  />
                  <div
                    ref={(ref) => (ingredientDropdownRefs.current[index] = ref)}
                    className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto ${
                      showIngredientDropdown[index] ? "block" : "hidden"
                    }`}
                  >
                    {ingredientsList.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => handleIngredientSelect(index, item)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                      >
                        {item.name}
                      </li>
                    ))}
                  </div>
                </div>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, e)}
                  className={`mt-2 block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
                />
                <div className="relative mt-2">
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
                    className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
                  />
                  <div
                    ref={(ref) => (unitDropdownRefs.current[index] = ref)}
                    className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto ${
                      showUnitDropdown[index] ? "block" : "hidden"
                    }`}
                  >
                    {unitsList.map((unit, unitIndex) => (
                      <li
                        key={unitIndex}
                        onClick={() => handleUnitSelect(index, unit)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                      >
                        {unit}
                      </li>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="mt-2 text-red-500 hover:underline"
                >
                  Remove Ingredient
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Add Ingredient
            </button>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Steps</h2>
            {recipeEdit.steps.map((step, index) => (
              <div key={index} className="mb-2">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor={`step-${index}`}
                >
                  Step {index + 1}
                </label>
                <textarea
                  id={`step-${index}`}
                  name="steps"
                  value={step}
                  onChange={(e) => handleStepChange(index, e)}
                  placeholder="Enter step description"
                  className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
                />
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="mt-2 text-red-500 hover:underline"
                >
                  Remove Step
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Add Step
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Save Changes
            </button>
            <Link
              to={`/recipes/details/${id}`}
              className="text-blue-500 hover:underline"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
