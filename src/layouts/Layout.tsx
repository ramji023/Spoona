import FloatingButton from "../components/FloatingButton";
import Footer from "./Footer";
import Navbar from "./Navbar";
// import RecipeBox from "../components/RecipeBox";
// import SavedRecipe from "../pages/SavedRecipePage/SavedRecipe";
import PlannerPage from "../pages/plannerPage/PlannerPage";
export default function Layout() {
  return (
    <>
      <div className="h-screen font-poppins">
        <Navbar />
        <FloatingButton />
        <PlannerPage />
        <Footer />
      </div>
    </>
  );
}
