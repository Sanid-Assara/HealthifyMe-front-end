import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SearchContext = createContext();

export const dietOptions = [
  { value: "", text: "Diet" },
  { value: "balanced", text: "Balanced" },
  { value: "high-fiber", text: "High-Fiber" },
  { value: "high-protein", text: "High-Protein" },
  { value: "low-carb", text: "Low-Carb" },
  { value: "low-fat", text: "Low-Fat" },
  { value: "low-sodium", text: "Low-Sodium" },

  { value: "immunity", text: "Immunity" },
];

export const healthOptions = [
  { value: "", text: "Health" },
  { value: "alcohol-free", text: "Alcohol Free" },
  { value: "celery-free", text: "Celery Free" },
  { value: "crustcean-free", text: "Crustcean Free" },
  { value: "egg-free", text: "Eggs" },
  { value: "fish-free", text: "Fish free" },
  { value: "gluten-free", text: "Gluten free" },
  { value: "keto-friendly", text: "Keto Friendly" },
  { value: "kidney-friendly", text: "Kidney Friendly" },
  { value: "kosher", text: "Kosher" },
  { value: "low-potassium", text: "Low Potassium" },
  { value: "low-sugar", text: "Low Sugar" },
  { value: "mediterranean", text: "Mediterranean" },
  { value: "no-oil-added", text: "No oil added" },
  { value: "tree-nut-free", text: "Nuts free" },
  { value: "peanuts-free", text: "Peanuts free" },
  { value: "pescatarian", text: "Pescatarian" },
  { value: "pork-free", text: "Pork free" },
  { value: "red-meat-free", text: "Red Meat Free" },
  { value: "sesame-free", text: "Sesame" },
  { value: "shellfish-free", text: "Shellfish" },
  { value: "soy-free", text: "Soy Free" },
  { value: "sugar-conscious", text: "Sugar Conscious" },
  { value: "vegan", text: "Vegan" },
  { value: "vegetarian", text: "Vegetarian" },
];

const SearchProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("easy");
  const [loading, setLoading] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState(dietOptions[0].value);
  const [selectedHealth, setSelectedHealth] = useState(healthOptions[0].value);
  const [nextPage, setNextPage] = useState(true);
  const [PrevPage, setPrevPage] = useState(false);

  const baseUrl =
    `https://api.edamam.com/api/recipes/v2?type=public&app_id=` +
    import.meta.env.VITE_APP_ID +
    "&app_key=" +
    import.meta.env.VITE_APP_KEY;

  // https://api.edamam.com/api/recipes/v2?type=public&q=fish&app_id=73c6a329&app_key=d4bab8f8937b171382e737fcbab42fa0&diet=high-protein&health=egg-free
  // https://api.edamam.com/api/recipes/v2?q=fish&app_key=d4bab8f8937b171382e737fcbab42fa0&_cont=CHcVQBtNNQphDmgVQntAEX4BYUtxBwcARWRGAGUWYlVyBAcCUXlSBWASN1B0VgIAS2QTUjATMgYnA1YPFzATBDFCalIgVwcVLnlSVSBMPkd5BgNK&health=egg-free&diet=high-protein&type=public&app_id=73c6a329

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const handleDiet = (e) => {
    setSelectedDiet(e.target.value);
  };

  const handleHealth = (e) => {
    setSelectedHealth(e.target.value);
  };

  const apiCall = (url) => {
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        setRecipes(res.data.hits);
        setNextPage(res.data._links.next.href);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedDiet) {
      apiCall(`${baseUrl}&q=${query}&diet=${selectedDiet}`);
    } else if (selectedHealth) {
      apiCall(
        `${baseUrl}&q=${query}&diet=${selectedDiet}&health=${selectedHealth}`
      );
    } else {
      apiCall(`${baseUrl}&q=${query}`);
    }
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        query,
        selectedDiet,
        selectedHealth,
        setQuery,
        recipes,
        updateSearch,
        handleSearch,
        loading,
        selectedDiet,
        selectedHealth,
        handleDiet,
        handleHealth,
        nextPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
