import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TextSkeleton } from "./CustomSkeleton";
export default function AddedFoods() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getIngredientsByUser = async () => {
      try {
        const userRes = await axios.get(
          "https://healthifyme-api.onrender.com/API/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const userID = userRes.data.userId;

        const ingredientsRes = await axios.get(
          "https://healthifyme-api.onrender.com/API/ingredients/"
        );
        if (ingredientsRes.status === 200) {
          const filteredIngredients = ingredientsRes.data.filter(
            (ingredient) => ingredient.addedBy._id === userID
          );
          setIngredients(filteredIngredients);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getIngredientsByUser();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="container mx-auto">
          <div className="flex justify-start flex-wrap gap-4  mt-4 mb-4">
            {Array(8)
              .fill("")
              .map((_, i) => (
                <TextSkeleton width={"w-32"} height={"h-12"} />
              ))}
          </div>
        </div>
      ) : ingredients.length > 0 ? (
        <div className="container mx-auto">
          <div className="flex justify-start flex-wrap gap-4  mt-4 mb-4">
            {ingredients.map((ingredient) => (
              <div key={ingredient._id}>
                <Link
                  className="flex bg-primary hover:bg-secondary font-bold text-xl text-white hover:text-primary border-2 border-primary  hover:border-primary   shadow-md  rounded-lg  h-fit px-6 py-2 "
                  to={`/ingredients/details/${ingredient._id}`}
                >
                  <div>
                    <p>{ingredient.name}</p>
                  </div>
                </Link>
              </div>
            ))}
            <Link
              to="/ingredients/add"
              className="flex bg-secondary hover:bg-primary shadow-md  rounded-lg  h-fit px-16 pb-1 border-2 border-primary   cursor-pointer  font-bold text-4xl text-primary   hover:text-white"
            >
              <div>
                <p>+</p>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="flex justify-start flex-wrap gap-4  mt-4 mb-4">
            <Link
              to="/ingredients/add"
              className="flex bg-secondary hover:bg-primary shadow-md  rounded-lg  h-fit px-16 pb-1 border-2 border-primary   cursor-pointer  font-bold text-4xl text-primary   hover:text-white"
            >
              <div>
                <p>+</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
