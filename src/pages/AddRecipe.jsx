import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AddRecipe() {
  const [newRecipe, setNewRecipe] = useState({
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add Recipe</h1>
      <form
        onSubmit={handleCreate}
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
            value={newRecipe.name}
            onChange={handleChange}
            placeholder="Enter recipe name"
            className="block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset"
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
            value={newRecipe.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset"
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
            value={newRecipe.imageUrl}
            onChange={handleChange}
            placeholder="Add image url"
            className="block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset"
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
            value={newRecipe.nutritionalInfo.calories}
            onChange={handleChange}
            placeholder="Enter calories"
            className="block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset"
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
            value={newRecipe.nutritionalInfo.protein}
            onChange={handleChange}
            placeholder="Enter protein"
            className="block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset"
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
            value={newRecipe.nutritionalInfo.carbs}
            onChange={handleChange}
            placeholder="Enter carbs"
            className="block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset"
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
            value={newRecipe.nutritionalInfo.fat}
            onChange={handleChange}
            placeholder="Enter fat"
            className="block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset"
          />
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          {newRecipe.ingredients.map((ingredient, index) => (
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
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Steps
          </label>
          {newRecipe.steps.map((step, index) => (
            <div key={index} className="mb-2">
              <textarea
                placeholder={`Step ${index + 1}`}
                value={step}
                onChange={(e) => handleStepChange(index, e)}
                className="block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset"
              />
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addStep}
            className="font-bold btn btn-secondary mt-2"
          >
            Add Step
          </button>
        </div>
        <div className="flex gap-6">
          <button
            type="submit"
            className="font-bold btn btn-primary flex-1 w-full text-xl"
          >
            Create
          </button>
          <Link to="/profile" className="flex-1">
            <button className="font-bold btn bg-red-700 text-white w-full text-xl hover:bg-red-800">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
