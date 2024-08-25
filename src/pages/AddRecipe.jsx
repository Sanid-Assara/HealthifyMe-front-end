import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AddRecipe() {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
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
    sharedWithCommunity: false,
  });

  const navigate = useNavigate();

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
    } else if (name === "sharedWithCommunity") {
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        sharedWithCommunity: value === "true",
      }));
    } else {
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...newRecipe.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [name]: value,
    };
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
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
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [
        ...prevRecipe.ingredients,
        { foodItem: "", quantity: "", unit: "" },
      ],
    }));
  };

  const removeIngredient = (index) => {
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter((_, i) => i !== index),
    }));
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
      .post(`https://healthifyme-api.onrender.com/API/recipes/`, newRecipe)
      .then((res) => {
        console.log(res.data);
        navigate(`/recipes/details/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center m-auto min-h-screen py-10 max-w-lg items-center">
      <form
        onSubmit={handleCreate}
        className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={newRecipe.name}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            required
            id="description"
            name="description"
            value={newRecipe.description}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            required
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={newRecipe.imageUrl}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            required
            type="number"
            id="calories"
            name="calories"
            value={newRecipe.nutritionalInfo.calories}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            required
            type="number"
            id="protein"
            name="protein"
            value={newRecipe.nutritionalInfo.protein}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            required
            type="number"
            id="carbs"
            name="carbs"
            value={newRecipe.nutritionalInfo.carbs}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            required
            type="number"
            id="fat"
            name="fat"
            value={newRecipe.nutritionalInfo.fat}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            required
            type="text"
            id="dietaryTags"
            name="dietaryTags"
            value={newRecipe.dietaryTags.join(", ")}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="addedBy"
          >
            Added By (User ID)
          </label>
          <input
            required
            type="text"
            id="addedBy"
            name="addedBy"
            value={newRecipe.addedBy}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="sharedWithCommunity"
          >
            Shared with Community
          </label>
          <select
            id="sharedWithCommunity"
            name="sharedWithCommunity"
            value={newRecipe.sharedWithCommunity.toString()}
            onChange={handleChange}
            className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Ingredients
          </label>
          {newRecipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                name="foodItem"
                placeholder="Food Item ID"
                value={ingredient.foodItem}
                onChange={(e) => handleIngredientChange(index, e)}
                className="shadow text-lg appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                className="shadow text-lg appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                className="shadow text-lg appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="font-bold btn btn-secondary mt-2"
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
                className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
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
            <button className="font-bold btn btn-error w-full text-xl">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
