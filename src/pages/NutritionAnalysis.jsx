import { useState } from "react";

// A separate file with items (url should contain a link for each image)
const items = [
  {
    id: "item-01",
    name: "Item 1",
    url: "https://picsum.photos/id/13/200/100",
    category: "Vegetarian",
  },
  {
    id: "item-02",
    name: "Item 2",
    url: "https://picsum.photos/id/14/200/100",
    category: "Vegan",
  },
  {
    id: "Item 3",
    name: "Item 3",
    url: "https://picsum.photos/id/15/200/100",
    category: "Paleo",
  },
  {
    id: "Item 4",
    name: "Item 4",
    url: "https://picsum.photos/id/16/200/100",
    category: "Vegetarian",
  },
  {
    id: "Item 5",
    name: "Become the best version of you",
    url: "https://picsum.photos/id/15/200/100",
    category: "Low-Carb",
  },
  {
    id: "Item 6",
    name: "Avocado Smoothie",
    url: "https://picsum.photos/id/16/200/100",
    category: "Low-Carb",
  },
];

export default function NutriAnalysis() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handleCheckbox(e) {
    const category = e.target.id;

    if (e.target.checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    }
  }

  const displayedItems = items
    .filter(
      (item) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category)
    )
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )
    .map((item) => (
      <div key={item.id} className="mb-4 relative rounded-lg">
        <div className="flex justify-center relative overflow-hidden group cursor-pointer rounded-lg">
          <img
            src={item.url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="bg-secondary text-neutral font-bold opacity-70 absolute bottom-0 left-0 right-0 text-center content-center h-full translate-y-full transition group-hover:translate-y-0">
            See recipe
          </div>
        </div>
        <div className="p-4 pb-8">
          <p className="font-bold text-xl text-primary">{item.name}</p>
          <div className="capitalize absolute top-2 right-2">
            <div className="badge badge-secondary">{item.category}</div>
            <div className="badge badge-accent">
              <p>Other</p>
            </div>
          </div>
          <div className="card-actions justify-between">
            <p>4 Ingredients</p>
            <p className="font-bold">300 calories</p>
          </div>
        </div>
      </div>
    ));

  return (
    <main className="mx-auto min-h-screen flex items-center flex-col gap-4 bg-base-200">
      <h1 className="text-4xl font-bold text-primary text-center pt-16">
        Nutrition Analysis
      </h1>
      <section className="relative">
        <input
          type="text"
          id="search"
          className="p-2 bg-gray-50 border-gray-300 rounded-md"
          placeholder="Search items..."
          onChange={handleSearch}
        />
      </section>
      <section className="flex flex-col md:flex-row mx-auto container max-w-6xl">
        <article className="space-y-2 p-2 w-full max-w-[10rem]">
          <h2 className="text-xl font-semibold">Diet</h2>
          <aside className="flex sm:flex-col gap-2">
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="Vegetarian"
                className="mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="Vegetarian">Vegetarian</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="Vegan"
                className="mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="Vegan">Vegan</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="Paleo"
                className="mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="Paleo">Paleo</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="High-Fiber"
                className="mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="High-Fiber">High-Fiber</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="High-Protein"
                className="mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="High-Protein">High-Protein</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="Low-Carb"
                className="mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="Low-Carb">Low-Carb</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="Low-Fat"
                className="mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="Low-Fat">Low-fat</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="Low-Sodium"
                className="mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="Low-Sodium">Low-Sodium</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="Low-Sugar"
                className="mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="Low-Sugar">Low-Sugar</label>
            </div>
          </aside>
          <h2 className="text-xl font-semibold">Allergies</h2>
          <aside className="flex sm:flex-col gap-2">
            <label htmlFor="Vegetarian">
              <input
                type="checkbox"
                id="Vegetarian"
                className="mr-1"
                onChange={handleCheckbox}
              />
              Glutten
            </label>

            <label>
              <input
                type="checkbox"
                id="Eggs"
                className="mr-1"
                onChange={handleCheckbox}
              />
              Eggs
            </label>
            <label htmlFor="Soy">
              <input
                type="checkbox"
                id="Soy"
                className="mr-1"
                onChange={handleCheckbox}
              />
              Soy
            </label>
          </aside>
        </article>
        <article className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-content-center p-2">
          {displayedItems}
        </article>
      </section>
    </main>
  );
}

// <>
//   <div className="min-h-screen bg-gray-100">
//     <h1 className="text-4xl font-bold text-red-600 text-center pt-16">
//       Nutrition Analysis
//     </h1>
//     <div className="flex items-center justify-center gap-6 py-12">
//       <label className="input input-bordered flex items-center w-full max-w-md gap-2">
//         <input type="text" className="grow" placeholder="Search" />
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 16 16"
//           fill="currentColor"
//           className="h-4 w-4 opacity-70"
//         >
//           <path
//             fillRule="evenodd"
//             d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </label>
//       <div className="form-control">
//         <label className="cursor-pointer label">
//           <input type="checkbox" className="checkbox checkbox-secondary" />
//           <span className="label-text pl-2">Advance options </span>
//         </label>
//       </div>
//     </div>
//     <div className="flex items-center justify-center gap-6 py-12"></div>
//     <div className="container m-auto grid grid-cols-4 gap-6"></div>
//   </div>
// </>
