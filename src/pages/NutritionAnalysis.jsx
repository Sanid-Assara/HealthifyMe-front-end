// import { useContext, useState } from "react";
// import { SearchContext } from "../context/SearchProvider";

export default function NutriAnalysis() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 container m-auto px-10 lg:px-0 py-12 gap-x-12">
          <div>
            <h1 className="text-4xl font-bold text-primary">
              Nutrition Analysis
            </h1>
            <form className="mt-8">
              <textarea
                name=""
                rows="3"
                id="search-ingr"
                value=""
                placeholder="Search ingredients"
                class="block w-full rounded-lg border-0 p-2 shadow-sm ring-1 ring-inset ring-base-200 focus:ring-2 focus:ring-secondary sm:text-sm sm:leading-6"
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
            </form>
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
                  <tr>
                    <td>1</td>
                    <td>whole</td>
                    <td>Avocado</td>
                    <td>321.6 kcal</td>
                    <td>201 g</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>cup</td>
                    <td>Carrots</td>
                    <td>50 kcal</td>
                    <td>122 g</td>
                  </tr>
                </tbody>
              </table>
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
                <p className="font-bold text-xl">Amount Per Serving</p>
                <p className="font-bold text-3xl">Calories 315</p>
              </div>
              <hr className="border-4 my-4" />
              <p className="font-bold text-right">% Daily Value*</p>
              <div className="overflow-x-auto">
                <table className="table table-bordered table-fixed border my-4">
                  <tbody>
                    <tr className="hover">
                      <th colspan="2">
                        <b>Total Fat</b>
                      </th>
                      <td> 16.8 g</td>
                      <td>
                        <b>26 %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <td class="blank-cell"></td>
                      <th>Saturated Fat </th>
                      <td>9.6 g</td>
                      <td>
                        <b>48 %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <td class="blank-cell"></td>
                      <th>Trans Fat -</th>
                      <td></td>
                    </tr>
                    <tr className="hover">
                      <th colspan="2">
                        <b>Cholesterol</b>
                      </th>
                      <td>51.6 mg</td>
                      <td>
                        <b>17 %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colspan="2">
                        <b>Sodium</b>
                      </th>
                      <td>221.7 mg</td>
                      <td>
                        <b>9 %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <th colspan="2">
                        <b>Total Carbohydrate</b>
                      </th>
                      <td>24.8 g</td>
                      <td>
                        <b>8 %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <td class="blank-cell"></td> <th>Dietary Fiber </th>
                      <td>0 g</td>
                      <td>
                        <b>0 %</b>
                      </td>
                    </tr>
                    <tr className="hover">
                      <td class="blank-cell"></td> <th>Total Sugars </th>
                      <td>26 g</td>
                      <td></td>
                    </tr>
                    <tr className="hover">
                      <td class="blank-cell"></td>
                      <th>Includes - Added Sugars</th>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr class="thick-end hover">
                      <th colspan="2">
                        <b>Protein</b>
                      </th>
                      <td>16.2 g</td>
                      <td>
                        <b>32 %</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
