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
      <div className="min-h-screen bg-gray-100 px-4">
        <div className="container m-auto px-10 ">
          <h1 className="text-4xl font-bold text-primary text-center py-16">
            My Recipes
          </h1>
          <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 shadow appearance-none border rounded leading-tight py-12">
            <CreatedRecipes />
          </div>
          <h1 className="text-4xl font-bold text-primary text-center py-16">
            My Ingredients
          </h1>
          <div className="flex flex-col flex-1 bg-white px-8 pt-8 pb-4 mb-12 shadow appearance-none border rounded leading-tight py-12">
            <AddedFoods />
          </div>
        </div>
      </div>
    </>
  );
}
