import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal";
import IngredientSkeleton from "../components/IngredientSkeleton";

export default function IngredientDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [ingredient, setIngredient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://healthifyme-api.onrender.com/API/ingredients/${id}`)
      .then((res) => {
        setIngredient(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 750);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ingredient) {
    return <div>Ingredient not found</div>;
  }

  return isLoading ? (
    <IngredientSkeleton />
  ) : (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="container m-auto px-10 lg:px-0">
        <h1 className="text-4xl font-bold text-primary text-center pt-16">
          {ingredient.name}
        </h1>
        <div className="flex flex-col flex-1 gap-4  px-8 pt-8 pb-4  py-12">
          {/*Section 1*/}
          <div className="flex flex-col flex-1 gap-10 bg-white px-8 pt-8 pb-8 mb-4 shadow appearance-none border rounded leading-tight py-12">
            <div className="flex">
              {/*Nutri info*/}
              <div className="flex flex-col justify-center items-center  flex-1">
                <div className="flex justify-center items-center">
                  <h3 className="font-bold text-4xl text-center text-primary">
                    Nutritional Info
                  </h3>
                </div>
                <div className="p-4 flex space-x-4">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-center px-5  flex items-center justify-center font-bold text-primary text-lg bg-secondary rounded-lg">
                      Calories
                    </p>
                    <p className="flex items-center justify-center  px-5  font-bold text-accent text-lg bg-secondary rounded-lg  w-full">
                      {ingredient.calories ?? "N/A"} kcal
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-center px-5  flex items-center justify-center font-bold text-primary text-lg bg-secondary rounded-lg">
                      Protein
                    </p>
                    <p className="flex items-center justify-center  px-5  font-bold text-accent text-lg bg-secondary rounded-lg  w-full">
                      {ingredient.macronutrients?.protein ?? "N/A"}g
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-center px-5  flex items-center justify-center font-bold text-primary text-lg bg-secondary rounded-lg">
                      Carbs
                    </p>
                    <p className="flex items-center justify-center  px-5  font-bold text-accent text-lg bg-secondary rounded-lg  w-full">
                      {ingredient.macronutrients?.carbs ?? "N/A"}g
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-center px-5  flex items-center justify-center font-bold text-primary text-lg bg-secondary rounded-lg">
                      Fat
                    </p>
                    <p className="flex items-center justify-center  px-5  font-bold text-accent text-lg bg-secondary rounded-lg  w-full">
                      {ingredient.macronutrients?.fat ?? "N/A"}g
                    </p>
                  </div>
                </div>
              </div>

              {/*Brand Name*/}
              <div className="flex flex-col justify-center items-center  flex-1">
                <div className="flex justify-center items-center ">
                  <h3 className="font-bold text-4xl text-center text-primary">
                    Brand Name
                  </h3>
                </div>
                <div className="p-4 flex space-x-4">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="font-bold text-accent text-xl bg-secondary rounded-lg p-4">
                      {ingredient.brand ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/*Buttons*/}
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
      </div>
    </div>
  );
}
