import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/landingPage/LandingPage";
import Home from "./pages/HomePage/Home";
import PlannerPage from "./pages/plannerPage/PlannerPage";
import SavedRecipe from "./pages/SavedRecipePage/SavedRecipe";
import Profile from "./pages/profilePage/Profile";
import CommunityPage from "./pages/communityPage/CommunityPage";
import AddRecipe from "./pages/recipePage/AddRecipe";
import { useAuthStore } from "./stores/authStore";
import { useEffect, useState } from "react";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import axios from "axios";
import RecipeBox from "./pages/recipePage/RecipeBox";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const refreshAuth = async () => {
      try {
        // console.log("refresh token request is gone")
        const storedToken = await axios.post(
          "http://localhost:3000/api/v1/user/refresh",
          null,
          { withCredentials: true }
        );
        useAuthStore.setState({
          token: storedToken.data.data,
          isAuthenticated: true,
        });
        // console.log("refresh token request is passed");
      } catch (err) {
        console.log("refresh token request is failed");
        useAuthStore.setState({
          token: null,
          isAuthenticated: false,
        });
        return;
      } finally {
        setLoading(false);
      }
    };
    refreshAuth();
  }, []);
  console.log("App rendered");

  if (loading) {
    return <div>Spoona is reloading...</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/auth" element={<LandingPage />}>
              <Route path="signup" element={<Signup />} />
              <Route path="signin" element={<Signin />} />
            </Route>

            <Route path="home" element={<Home />} />
            <Route path="planner" element={<PlannerPage />} />
            <Route path="saved" element={<SavedRecipe />} />
            <Route path="account" element={<Profile />} />
            <Route path="communities" element={<CommunityPage />} />
            <Route path="add-recipe" element={<AddRecipe />} />
            <Route path="recipe/:recipeId" element={<RecipeBox />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
