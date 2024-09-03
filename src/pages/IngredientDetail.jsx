import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal";

export default function IngredientDetail() {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://healthifyme-api.onrender.com/API/ingredients/${id}`)
      .then((res) => {
        setIngredient(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`https://healthifyme-api.onrender.com/API/ingredients/${id}`)
      .then(() => {
        navigate("/my-recipes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-y-10 items-center py-10">
        <h1 className="text-3xl text-center text-accent font-bold capitalize">
          {ingredient.name}
        </h1>
        <div className="max-w-screen-md bg-base-100 m-auto pb-6 rounded-xl">
          <div className="flex justify-between items-center mb-6 px-8">
            <div className="badge badge-secondary  text-lg py-3 px-4">
              {ingredient.brand}
            </div>
          </div>
          <div>
            <p className="text-justify px-8">
              {" "}
              {ingredient.calories ?? "N/A"}{" "}
            </p>
            <p className="text-justify px-8">
              {ingredient.macronutrients?.protein ?? "N/A"}g Protein
            </p>
            <p className="text-justify px-8">
              {ingredient.macronutrients?.carbs ?? "N/A"}g Carbs
            </p>
            <p className="text-justify px-8">
              {ingredient.macronutrients?.fat ?? "N/A"}g Fat
            </p>
          </div>

          <div className="flex gap-4 justify-end items-end flex-1 self-end mb-2">
            <Link
              className="bg-primary hover:bg-secondary text-secondary hover:text-primary border-2 border-primary hover:border-2  hover:border-primary text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
              to={`/ingredients/edit/${id}`}
            >
              <button>Edit</button>
            </Link>
            <Link
              className=" bg-accent hover:bg-white text-white hover:text-accent border-2 border-accent hover:border-2  hover:border-accent text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
              to={`/my-recipes`}
            >
              <button>Go Back</button>
            </Link>
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-error hover:bg-white text-white hover:text-error border-2 border-error hover:border-2  hover:border-error text-xl rounded-lg font-bold flex items-center justify-center cursor-pointer list-none  text-center w-36 py-3"
              >
                Delete
              </button>

              <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
