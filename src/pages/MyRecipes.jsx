import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreatedRecipes from "../components/CreatedRecipes";
import AddedFoods from "../components/AddedFoods";

export default function MyRecipes() {
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
            // console.log(res.data);

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
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="flex justify-start items-start gap-4 my-8">
          <Link to="/recipes/add">
            <button className="btn btn-secondary w-36">Create Recipe</button>
          </Link>
          <Link to="/foods/add">
            <button className="btn btn-secondary w-36">Add Food</button>
          </Link>
        </div>
        <CreatedRecipes />
        <AddedFoods />
      </div>
    </>
  );
}
