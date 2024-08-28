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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!newRecipe.name.trim()) newErrors.name = "Recipe name is required.";
    if (!newRecipe.description.trim())
      newErrors.description = "Description is required.";
    if (!newRecipe.imageUrl.trim()) newErrors.imageUrl = "Image is required.";
    if (!newRecipe.calories || isNaN(newRecipe.calories))
      newErrors.calories = "Calories information is required.";
    if (!newRecipe.protein || isNaN(newRecipe.protein))
      newErrors.protein = "Protein information is required.";
    if (!newRecipe.carbs || isNaN(newRecipe.carbs))
      newErrors.carbs = "Carbs information is required.";
    if (!newRecipe.fat || isNaN(newRecipe.fat))
      newErrors.fat = "Fat information is required.";
    if (!newRecipe.dietaryTags || !newRecipe.dietaryTags.length === 0)
      newErrors.dietaryTags = "Dietary information is required.";

    return newErrors;
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
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    axios
      .post(`https://healthifyme-api.onrender.com/API/recipes/`, newRecipe)
      .then((res) => {
        console.log(res.data);
        setErrors({});
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
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
          )}
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
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
          />
          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">{errors.description}</p>
          )}
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
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
          />
          {errors.imageUrl && (
            <p className="text-red-500 mt-1 text-sm">{errors.imageUrl}</p>
          )}
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
            placeholder="Enter recipe name"
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
          />
          {errors.calories && (
            <p className="text-red-500 mt-1 text-sm">{errors.calories}</p>
          )}
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
            placeholder="Enter recipe name"
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
          />
          {errors.protein && (
            <p className="text-red-500 mt-1 text-sm">{errors.protein}</p>
          )}
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
            placeholder="Enter recipe name"
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
          />
          {errors.carbs && (
            <p className="text-red-500 mt-1 text-sm">{errors.carbs}</p>
          )}
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
            placeholder="Enter recipe name"
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
          />
          {errors.fat && (
            <p className="text-red-500 mt-1 text-sm">{errors.fat}</p>
          )}
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
            value={newRecipe.dietaryTags.join(", ")}
            onChange={handleChange}
            placeholder="Add dietary tags"
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
          />
          {errors.dietaryTags && (
            <p className="text-red-500 mt-1 text-sm">{errors.dietaryTags}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="addedBy"
          >
            Added By (User ID)
          </label>
          <input
            type="text"
            id="addedBy"
            name="addedBy"
            value={newRecipe.addedBy}
            onChange={handleChange}
            placeholder="Enter user ID or name"
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
          />
          {errors.addedBy && (
            <p className="text-red-500 mt-1 text-sm">{errors.addedBy}</p>
          )}
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
            className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
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
                className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
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
                className={`block w-full rounded-md border-0 bg-black/5 py-3 px-2 text-dark shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset`}
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
