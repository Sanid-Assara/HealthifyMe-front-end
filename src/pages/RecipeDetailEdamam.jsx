import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecipeDetailEdamam() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null); // Initialize with null instead of an empty array
  const navigate = useNavigate();

  const baseUrl = "https://api.edamam.com/api/recipes/v2/";

  // const baseUrl =
  //   `https://api.edamam.com/api/recipes/v2${id}?type=public&app_id=` +
  //   import.meta.env.VITE_APP_ID +
  //   "&app_key=" +
  //   import.meta.env.VITE_APP_KEY;

  useEffect(() => {
    axios
      .get(
        `${baseUrl}${id}?type=public&app_id=${
          import.meta.env.VITE_APP_ID
        }&app_key=${import.meta.env.VITE_APP_KEY}`
      )
      .then((res) => {
        console.log(res.data.recipe);
        setRecipe(res.data.recipe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!recipe) {
    return (
      <div className="grid min-h-full place-items-center bg-white px-6 py-16 sm:py-32 lg:px-8">
        <div className="flex w-1/2 flex-col gap-4">
          <p className="text-center font-bold">Loading ...</p>
          <div className="skeleton h-52 w-full mb-8"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100" key={recipe.label}>
        <div className="grid grid-cols-1 lg:grid-cols-2 container m-auto px-10 lg:px-0 py-12 gap-x-12">
          <div>
            <h1 className="text-4xl font-bold text-primary">{recipe.label}</h1>
            <div className="card-actions justify-between py-6">
              <div className="badge badge-success capitalize text-base-100">
                Cuisine:
                <span className="font-bold pl-2 ">{recipe.cuisineType[0]}</span>
              </div>
              <div className="badge badge-accent capitalize text-base-100">
                Meal:
                <span className="font-bold pl-2">{recipe.mealType[0]}</span>
              </div>
              <div className="badge badge-secondary">
                Diet:
                <span className="font-bold pl-2">{recipe.dietLabels[0]}</span>
              </div>
            </div>
            <figure className="py-4 drop-shadow-lg">
              <img
                src={recipe.images.REGULAR.url}
                alt={recipe.label}
                className="rounded-xl object-cover h-96 w-full"
              />
            </figure>
            <p className="font-bold text-lg py-6">Health labels</p>
            {recipe.healthLabels.map((hl) => (
              <span className="pr-2" key={hl}>
                {hl} |
              </span>
            ))}
            {/* Ingridients */}
            <div>
              <h2 className="font-bold text-lg py-6">Ingridientes</h2>
              <ul className="list-disc list-outside">
                {recipe.ingredientLines.map((ingr) => (
                  <li key={ingr}>{ingr}</li>
                ))}
              </ul>
              <h2 className="font-bold text-lg py-6">Preparation</h2>
              <div className="flex justify-between py-6">
                <a href={recipe.url} target="_blank">
                  <button className="join-item btn btn-secondary w-36">
                    Instructions
                  </button>
                </a>
                <p className="pt-2">
                  Recipe from
                  <a
                    href={recipe.url}
                    target="_blank"
                    className="pl-4 font-bold text-primary underline underline-offset-4 hover:text-secondary"
                  >
                    {recipe.source}
                  </a>
                </p>
                <Link to="/recipes/explore">
                  <button className="join-item btn btn-accent text-base-100 w-36">
                    Go back
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* col 2 */}
          <div className="px-12">
            <div className="m-auto bg-base-100 border-base-200 drop-shadow-lg rounded-xl p-6">
              <h2 className="font-bold text-4xl text-center">
                Nutrition Facts
              </h2>
              <hr className="border-4 my-4" />
              <div className="flex justify-between items-center mb-6">
                <p className="font-bold text-xl">
                  Daily value: {Math.round(recipe.calories) / 20} %
                </p>
                <p className="font-bold text-3xl">
                  Calories {Math.round(recipe.calories)}
                </p>
              </div>
              <hr className="border-4 my-4" />
              <p className="font-bold text-right">% Daily Value*</p>
              <div className="overflow-x-auto">
                <table className="table table-bordered table-fixed border my-4">
                  <tbody>
                    <tr className="hover">
                      <th colSpan="2">
                        <b>Total Fat</b>
                      </th>
                      <td>{recipe.digest[0].total.toFixed(1)} g</td>
                      <td>
                        <b>{recipe.digest[0].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2" className="pl-16">
                        Saturated
                      </th>
                      <td>{recipe.digest[0].sub[0].daily.toFixed(1)} g</td>
                      <td>
                        <b>1 %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2" className="pl-16">
                        Trans Fat
                      </th>
                      <td>{recipe.digest[0].sub[1].total.toFixed(1)} g</td>
                      <td>{recipe.digest[0].sub[1].daily.toFixed(1)} %</td>
                      {/* {results ? (
                            <td>0 g</td>
                          ) : (
                            <td>
                              {results.totalNutrients.FATRN.quantity.toFixed(1)}
                              g
                            </td>
                          )} */}
                    </tr>
                    <tr className="hover">
                      <th colSpan="2" className="pl-16">
                        Monosaturated
                      </th>
                      <td>{recipe.digest[0].sub[2].total.toFixed(1)} g</td>
                      <td>
                        <b>{recipe.digest[0].sub[2].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2" className="pl-16">
                        Polyunsaturated
                      </th>
                      <td>{recipe.digest[0].sub[3].total.toFixed(1)} g</td>
                      <td>
                        <b>{recipe.digest[0].sub[3].daily.toFixed(1)} %</b>
                      </td>
                    </tr>

                    <tr className="hover">
                      <th colSpan="2">
                        <b>Total Carbohydrate</b>
                      </th>
                      <td>{recipe.digest[1].total.toFixed(1)} g</td>
                      <td>
                        <b>{recipe.digest[1].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2" className="pl-16">
                        Carbs (net)
                      </th>

                      <td>{recipe.digest[1].sub[0].total.toFixed(1)} g</td>
                      <td>
                        <b>{recipe.digest[1].sub[0].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2" className="pl-16">
                        Fiber
                      </th>

                      <td>{recipe.digest[1].sub[1].total.toFixed(1)} g</td>
                      <td>
                        <b>{recipe.digest[1].sub[1].daily.toFixed(1)} %</b>
                      </td>
                      {/* {results ? (
                            <>
                              <td> - </td>
                              <td> - </td>
                            </>
                          ) : (
                            <>
                              <td>
                                {results.totalNutrients.FIBTG.quantity.toFixed(
                                  1
                                )}
                                g
                              </td>
                              <td>
                                {Math.round(results.totalDaily.FIBTG.quantity)}%
                              </td>
                            </>
                          )} */}
                    </tr>

                    <tr className="hover">
                      <th colSpan="2" className="pl-16">
                        Sugar
                      </th>
                      <td>{recipe.digest[1].sub[2].total.toFixed(1)} g</td>
                      <td>
                        <b>{recipe.digest[1].sub[2].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2" className="pl-16">
                        Sugars, added
                      </th>
                      <td>{recipe.digest[1].sub[3].total.toFixed(1)} g</td>
                      <td>
                        <b>{recipe.digest[1].sub[3].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2">
                        <b>Protein</b>
                      </th>
                      <td>{recipe.digest[2].total.toFixed(1)} g</td>
                      <td>
                        <b>{recipe.digest[2].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2">
                        <b>Cholesterol</b>
                      </th>
                      <td>{recipe.digest[3].total.toFixed(1)} mg</td>
                      <td>
                        <b>{recipe.digest[3].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2">
                        <b>Sodium</b>
                      </th>
                      <td>{recipe.digest[4].total.toFixed(1)} mg</td>
                      <td>
                        <b>{recipe.digest[4].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2">
                        <b>Calcium</b>
                      </th>
                      <td>{recipe.digest[5].total.toFixed(1)} mg</td>
                      <td>
                        <b>{recipe.digest[5].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colSpan="2">
                        <b>Magnesium</b>
                      </th>
                      <td>{recipe.digest[6].total.toFixed(1)} mg</td>
                      <td>
                        <b>{recipe.digest[6].daily.toFixed(1)} %</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm font-light">
                  * Percent Daily Values are based on a 2000 calorie diet
                </p>
              </div>
            </div>
          </div>
          {/* End colum 2 */}
        </div>
      </div>
    </>
  );
}
