import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/landingPage/LandingPage";
import Home from "./pages/HomePage/Home";
import PlannerPage from "./pages/plannerPage/PlannerPage";
import SavedRecipe from "./pages/SavedRecipePage/SavedRecipe";
import Profile from "./pages/profilePage/Profile";
import CommunityPage from "./pages/communityPage/CommunitiesPage";
import AddRecipe from "./pages/recipePage/AddRecipe";
import { useAuthStore } from "./stores/authStore";
import { useEffect, useState } from "react";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import axios from "axios";
import RecipeBox from "./pages/recipePage/RecipeBox";
import Community from "./pages/communityPage/Community";
function App() {
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);
  const id = useAuthStore((s) => s.id);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // console.log("In app component useAuthStore data : ",{ token, id, isAuthenticated });
  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const storedToken = await axios.post(
          "http://localhost:3000/api/v1/user/refresh",
          null,
          { withCredentials: true }
        );
        // console.log(storedToken.data.data.accessToken)
        // console.log(storedToken.data)
        useAuthStore.setState({
          token: storedToken.data.data.accessToken,
          id: storedToken.data.data.id,
          isAuthenticated: true,
        });
        // console.log({ token, id, isAuthenticated });
      } catch (err) {
        console.log("refresh token request is failed");
        useAuthStore.setState({
          token: null,
          id: null,
          isAuthenticated: false,
        });
        return;
      } finally {
        setLoading(false);
      }
    };
    refreshAuth();
  }, []);
  // console.log("App component ");

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
            <Route path="communities/:communityId" element={<Community />} />
            <Route path="add-recipe" element={<AddRecipe />} />
            <Route path="recipe/:recipeId" element={<RecipeBox />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
