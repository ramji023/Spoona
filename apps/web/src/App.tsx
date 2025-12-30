import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/landingPage/LandingPage";
import Home from "./pages/HomePage/Home";
import PlannerPage from "./pages/plannerPage/PlannerPage";
import SavedRecipe from "./pages/SavedRecipePage/SavedRecipe";
import Profile from "./pages/profilePage/Profile";
import CommunitiesPage from "./pages/communityPage/CommunitiesPage";
import AddRecipe from "./pages/recipePage/AddRecipe";
import { useAuthStore } from "./stores/authStore";
import { useEffect, useState } from "react";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import axios from "axios";
import RecipeBox from "./pages/recipePage/RecipeBox";
import Community from "./pages/communityPage/Community";
import { GlobalLoader } from "./loaders/Loaders";
import { motion, AnimatePresence } from "motion/react";
import NotFound from "./errors/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import Err from "./errors/ErrorBoundary";
import { useUserRecipeData } from "./react_queries/queries";
import { useFailureMsgStore } from "./stores/failureMsgStore";
import User from "./pages/users/User";
import Users from "./pages/users/Users";
import { api } from "./utils/axiosInstance";

const MIN_LOADING_TIME = 1000;
function App() {
  const id = useAuthStore((s) => s.id);
  const setSavedRecipe = useAuthStore((s) => s.setSavedRecipe); // function to store user saved recipes
  const setFollowingData = useAuthStore((s) => s.setFollowingData); // function to store user following data
  const [loading, setLoading] = useState(true);

  const {
    data: userRecipeData,
    isLoading: recipeDataLoading,
    error: recipeDataError,
  } = useUserRecipeData(useAuthStore.getState().id, {
    enabled: !!id && useAuthStore.getState().isAuthenticated,
  });

  // only send request to refresh the token if user reload/refresh the page
  useEffect(() => {
    const refreshAuth = async () => {
      const startTime = Date.now();
      try {
        const storedToken = await api.post("/api/v1/user/refresh");
        // console.log(storedToken.data.data.accessToken)
        // console.log(storedToken.data)
        useAuthStore.setState({
          token: storedToken.data.data.accessToken,
          id: storedToken.data.data.id,
          isAuthenticated: true,
        });
        // console.log({ token, id, isAuthenticated });
      } catch (e) {
        console.log("refresh token request is failed", e);
        useAuthStore.setState({
          token: null,
          id: null,
          isAuthenticated: false,
        });
        return;
      } finally {
        const end_time = Date.now();
        const elapsedTime = end_time - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);
        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }
        setLoading(false);
      }
    };
    refreshAuth();
  }, []);
  // console.log("App component ");

  // run this effect to fetch user interactions if user is authenticated
  useEffect(() => {
    if (userRecipeData?.savedRecipes && userRecipeData.followingData) {
      setSavedRecipe(userRecipeData.savedRecipes);
      setFollowingData(userRecipeData.followingData);
    }
  }, [userRecipeData, setSavedRecipe]);

  // run effect to show error message it any error occurs while fetching user saved recipe data
  useEffect(() => {
    if (recipeDataError) {
      useFailureMsgStore.setState({
        failureMsg: "Something went wrong while fetching user recipe data",
      });
    }
  }, [recipeDataError]);

  const isLoading = loading || recipeDataLoading;
  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlobalLoader />
        </motion.div>
      </AnimatePresence>
    );
  }
  return (
    <>
      <ErrorBoundary fallback={<Err />}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="/auth" element={<LandingPage />}>
                  {" "}
                  // show landing page to user
                  <Route path="signup" element={<Signup />} /> // show signup
                  component
                  <Route path="signin" element={<Signin />} /> // render signin
                  component
                </Route>
                <Route path="home" element={<Home />} /> // show all the recipes
                to the user
                <Route path="planner" element={<PlannerPage />} />
                <Route path="saved" element={<SavedRecipe />} />
                <Route path="account" element={<Profile />} /> // show user
                profile data
                <Route path="communities" element={<CommunitiesPage />} /> //
                show global communities page
                <Route
                  path="communities/:communityId"
                  element={<Community />}
                />
                <Route path="add-recipe" element={<AddRecipe />} /> // show
                add-recipe form
                <Route path="recipe/:recipeId" element={<RecipeBox />} /> //
                show complete recipe data to user
                <Route path="creators" element={<Users />} /> //show creators
                data
                <Route path="creators/:creatorId" element={<User />} /> // show
                single creator data
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </motion.div>
      </ErrorBoundary>
    </>
  );
}

export default App;
