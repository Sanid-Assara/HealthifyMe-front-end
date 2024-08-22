import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("easy");
  const [loading, setLoading] = useState(true);

  const baseUrl = "https://api.edamam.com/api/recipes/v2";

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  useEffect(() => {
    axios
      .get(
        `${baseUrl}?type=public&q=${query}&app_id=${
          import.meta.env.VITE_APP_ID
        }&app_key=${import.meta.env.VITE_APP_KEY}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
        // console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        search,
        query,
        setQuery,
        recipes,
        updateSearch,
        handleSearch,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
