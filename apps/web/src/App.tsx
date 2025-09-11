import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/landingPage/LandingPage";
import Home from "./pages/HomePage/Home";
import PlannerPage from "./pages/plannerPage/PlannerPage";
import SavedRecipe from "./pages/SavedRecipePage/SavedRecipe";
import Profile from "./pages/profilePage/Profile";
import CommunityPage from "./pages/communityPage/CommunityPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="home" element={<Home />} />
            <Route path="planner" element={<PlannerPage />} />
            <Route path="saved" element={<SavedRecipe />} />
            <Route path="account" element={<Profile />} />
            <Route path="communities" element={<CommunityPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
