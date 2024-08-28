import { useState, useEffect } from "react";
import axios from "axios";

export default function NutriAnalysis() {
  const [results, setResults] = useState();
  const [ingr, setIngr] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const baseUrl =
    `https://api.edamam.com/api/nutrition-data?app_id=` +
    import.meta.env.VITE_APP_ID_NUTRI +
    "&app_key=" +
    import.meta.env.VITE_APP_KEY_NUTRI +
    "&nutrition-type=cooking";

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleIngr = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setIngr(search.split(" ").join("%20"));
    setSearch("");
    console.log(ingr);
    console.log(search);
  };

  const apiCall = (url) => {
    axios
      .get(url)
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (ingr) {
      apiCall(`${baseUrl}&ingr=${ingr}`);
    }
    // else {
    //   apiCall(`${baseUrl}&ingr=1%20cup%20rice`);
    // }
  }, [ingr]);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 container m-auto px-10 lg:px-0 py-12 gap-x-12">
          <div>
            <h1 className="text-4xl font-bold text-primary">
              Nutrition Analysis
            </h1>
            <form className="mt-8" onSubmit={handleIngr}>
              <label className="input input-bordered select-secondary flex items-center gap-2 pr-0">
                <input
                  name="ingr"
                  type="text"
                  id="search-ingr"
                  required
                  value={search}
                  onChange={updateSearch}
                  className="grow"
                  placeholder="Search ingredients"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <button className="btn btn-secondary" type="submit">
                  Search
                </button>
              </label>

              <div className=" flex justify-between gap-x-4">
                <p className="text-sm pt-6">
                  Enter only 1 ingredient to know the nutrimental value, you
                  must add a quantity and mesure unit, <br />
                  for example:
                  <span className="font-bold text-success">
                    {" "}
                    "1 cup rice", "100 g salmon"
                  </span>
                </p>
              </div>
            </form>

            {results ? (
              <>
                <div className="m-auto bg-secondary border-base-200 drop-shadow-lg rounded-xl my-8 p-6 mb-6">
                  <p className="text-center font-bold pb-4">
                    Nutrimental Values resume
                  </p>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <td>Qty</td>
                        <td>Unit</td>
                        <td>Food</td>
                        <td>Calories</td>
                        <td>Weight</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={results.ingredients[0].text}>
                        <td>{results.ingredients[0].parsed[0].quantity}</td>
                        <td>{results.ingredients[0].parsed[0].measure}</td>
                        <td>{results.ingredients[0].parsed[0].food}</td>
                        <td>{results.calories}kcal</td>
                        <td>{results.totalWeight} g</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="m-auto bg-secondary border-base-200 drop-shadow-lg rounded-xl my-8 p-6 mb-6">
                  <p className="text-center font-bold pb-4">
                    Nutrimental Values resume
                  </p>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <td>Qty</td>
                        <td>Unit</td>
                        <td>Food</td>
                        <td>Calories</td>
                        <td>Weight</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </>
            )}
          </div>
          {/* col 2 */}
          <div className="px-12">
            <div className="m-auto bg-base-100 border-base-200 drop-shadow-lg rounded-xl p-6">
              <h2 className="font-bold text-4xl text-center">
                Nutrition Facts
              </h2>
              <hr className="border-4 my-4" />
              {results ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <p className="font-bold text-xl">Amount Per Serving</p>
                    <p className="font-bold text-3xl">
                      Calories {results.calories}
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
                          <td>
                            {results?.totalNutrients.FAT.quantity.toFixed(1)} g
                          </td>
                          <td>
                            <b>
                              {Math.round(results.totalDaily.FAT.quantity)} %
                            </b>
                          </td>
                        </tr>
                        <tr className="hover">
                          <th colSpan="2" className="pl-16">
                            Saturated Fat
                          </th>
                          <td>
                            {results?.totalNutrients.FASAT.quantity.toFixed(1)}g
                          </td>
                          <td>
                            <b>
                              {Math.round(results.totalDaily.FASAT.quantity)} %
                            </b>
                          </td>
                        </tr>
                        <tr className="hover">
                          <th colSpan="2" className="pl-16">
                            Trans Fat
                          </th>
                          {results ? (
                            <td>0 g</td>
                          ) : (
                            <td>
                              {results.totalNutrients.FATRN.quantity.toFixed(1)}
                              g
                            </td>
                          )}
                        </tr>
                        <tr className="hover">
                          <th colSpan="2">
                            <b>Cholesterol</b>
                          </th>
                          <td>{results.totalNutrients.CHOLE.quantity} mg</td>
                          <td>
                            <b>17 %</b>
                          </td>
                        </tr>
                        <tr className="hover">
                          <th colSpan="2">
                            <b>Sodium</b>
                          </th>
                          <td>
                            {results.totalNutrients.NA.quantity.toFixed(1)} mg
                          </td>
                          <td>
                            <b>{results.totalDaily.NA.quantity.toFixed(2)} %</b>
                          </td>
                        </tr>
                        <tr className="hover">
                          <th colSpan="2">
                            <b>Total Carbohydrate</b>
                          </th>
                          <td>
                            {results.totalNutrients.CHOCDF.quantity.toFixed(1)}g
                          </td>
                          <td>
                            <b>
                              {Math.round(results.totalDaily.CHOCDF.quantity)} %
                            </b>
                          </td>
                        </tr>
                        <tr className="hover">
                          <th colSpan="2" className="pl-16">
                            Dietary Fiber
                          </th>

                          {results ? (
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
                          )}
                        </tr>
                        <tr className="hover">
                          <th colSpan="2" className="pl-16">
                            Total Sugars
                          </th>
                          <td>
                            {results.totalNutrients.SUGAR.quantity.toFixed(1)} g
                          </td>
                        </tr>
                        <tr className="hover">
                          <th colSpan="2">
                            <b>Protein</b>
                          </th>
                          <td>
                            {results.totalNutrients.PROCNT.quantity.toFixed(1)}g
                          </td>
                          <td>
                            <b>
                              {Math.round(results.totalDaily.PROCNT.quantity)} %
                            </b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-center">
                      Insert an ingredient to get results
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*
              <textarea
                name="ingr"
                rows="1"
                id="search-ingr"
                value={search}
                onChange={updateSearch}
                placeholder="Search ingredients"
                className="block w-full rounded-lg border-0 p-2 shadow-sm ring-1 ring-inset ring-base-200 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
              ></textarea>
              <div className=" flex justify-between gap-x-4">
                <p className="text-sm pt-6">
                  Enter an ingredient list list for what you are cooking, like
                  <span className="font-bold text-success">
                    "1 cup rice, 10 oz chickpeas"
                  </span>
                  , etc. Enter each ingredient on a new line.
                </p>
                <button className="btn btn-secondary mt-4" type="submit">
                  Search
                </button>
              </div>

*/
