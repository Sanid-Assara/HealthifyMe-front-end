import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AddRecipe from "./pages/AddRecipe";
import Community from "./pages/Community";
import EditRecipe from "./pages/EditRecipe";
import Login from "./pages/Login";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeExploration from "./pages/RecipeExploration";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import MyRecipes from "./pages/MyRecipes";
import WorkoutExploration from "./pages/WorkoutExploration";
import NutriAnalysis from "./pages/NutritionAnalysis";
import AddIngredient from "./pages/AddIngredient";
import IngredientDetail from "./pages/IngredientDetail";
import RecipeDetailEdamam from "./pages/RecipeDetailEdamam";

import Themes from "./components/Themes";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/recipes/explore" element={<RecipeExploration />} />
        <Route path="/recipes/:id" element={<RecipeDetailEdamam />} />
        <Route path="/workout/explore" element={<WorkoutExploration />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/recipes/add" element={<AddRecipe />} />
          <Route path="/ingredients/add" element={<AddIngredient />} />
          <Route path="/recipes/edit/:id" element={<EditRecipe />} />
          <Route path="/recipes/details/:id" element={<RecipeDetail />} />
          <Route
            path="/ingredients/details/:id"
            element={<IngredientDetail />}
          />
        </Route>

        <Route path="/nutri-analysis" element={<NutriAnalysis />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
