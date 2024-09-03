import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AddedFoods() {
  const [ingredients, setIngredients] = useState([]);

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

        const filteredIngredients = ingredientsRes.data.filter(
          (ingredient) => ingredient.addedBy._id === userID
        );

        setIngredients(filteredIngredients);
      } catch (err) {
        console.log(err);
      }
    };

    getIngredientsByUser();
  }, []);
  return (
    <>
      {ingredients.length > 0 ? (
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
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 mt-4 mb-4 h-96">
              <Link
                className="text-primary bg-secondary font-bold text-9xl mb-4  shadow-md relative rounded-lg border-4 border-primary text-center content-center cursor-pointer hover:text-secondary hover:bg-primary"
                to="/ingredients/add"
              >
                <div>+</div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
