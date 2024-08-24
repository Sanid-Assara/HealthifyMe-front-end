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
import Profile from "./pages/Profile";
import WorkoutExploration from "./pages/WorkoutExploration";
import NutriAnalysis from "./pages/NutritionAnalysis";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/recipes/add" element={<AddRecipe />} />
        <Route path="/community" element={<Community />} />
        <Route path="/recipes/edit/:id" element={<EditRecipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes/details/:id" element={<RecipeDetail />} />
        <Route path="/recipes/explore" element={<RecipeExploration />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/workout/explore" element={<WorkoutExploration />} />
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
