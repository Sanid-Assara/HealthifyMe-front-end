import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreatedRecipes from "../components/CreatedRecipes";
import AddedFoods from "../components/AddedFoods";

export default function Profile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("https://healthifyme-api.onrender.com/API/users/profile ", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        axios
          .get(
            `https://healthifyme-api.onrender.com/API/users/${res.data.userId}`
          )
          .then((res) => {
            console.log(res.data);

            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex justify-center items-center gap-4">
          <Link to="/recipes/add">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Create Recipe
            </button>
          </Link>
          <Link to="/foods/add">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Add Food
            </button>
          </Link>
        </div>
        <div>
          <CreatedRecipes />
          <AddedFoods />
        </div>
      </div>
    </>
  );
}
