import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AddIngredient() {
  const [newIngredient, setNewIngredient] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["protein", "carbs", "fat"].includes(name)) {
      setNewIngredient((prevIngredient) => ({
        ...prevIngredient,
        macronutrients: {
          ...prevIngredient.macronutrients,
          [name]: Number(value),
        },
      }));
    } else {
      setNewIngredient((prevIngredient) => ({
        ...prevIngredient,
        [name]: value,
      }));
    }
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
        newIngredient.addedBy = res.data.userId;
        return axios.post(
          "https://healthifyme-api.onrender.com/API/ingredients/",
          newIngredient
        );
      })
      .then((res) => {
        navigate(`/ingredients/details/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className=" flex justify-center  m-auto min-h-screen py-10 max-w-lg  items-center">
        <form
          onSubmit={handleCreate}
          className="flex flex-col flex-1 bg-white  px-8 pt-8 pb-4  shadow appearance-none border rounded  leading-tight"
        >
          <div className="mb-4">
            <label
              className="block text-primary text-xl font-bold mb-2"
              htmlFor="name"
            >
              Ingredient Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Brand Ingredient Name"
              onChange={handleChange}
              className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-primary text-xl font-bold mb-2"
              htmlFor="brand"
            >
              Brand Name
            </label>
            <input
              required
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter Brand Name"
              onChange={handleChange}
              className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
            />
          </div>

          {/* Calories Section */}
          <div className="mb-4">
            <label
              className="block text-primary text-xl font-bold mb-2"
              htmlFor="calories"
            >
              Calories
            </label>
            <input
              required
              type="number"
              id="calories"
              name="calories"
              min={0}
              placeholder="Enter Calories"
              onChange={handleChange}
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
              min={0}
              onChange={handleChange}
              placeholder="Enter protein"
              className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
            />
          </div>

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
              onChange={handleChange}
              min={0}
              placeholder="Enter fat"
              className="select-secondary block w-full rounded-md  bg-black/5  py-3 px-2 text-dark shadow-sm ring-3 focus:outline-none focus:border-primary focus:text-primary border-2 p-2"
            />
          </div>

          <div className="flex gap-6">
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-secondary hover:text-primary border-2 border-primary hover:border-2  hover:border-primary text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
            >
              Create
            </button>
            <Link
              to="/my-recipes"
              className="bg-error hover:bg-white text-white hover:text-error border-2 border-error hover:border-2  hover:border-error text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
            >
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
