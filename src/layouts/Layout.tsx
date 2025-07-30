import Home from "../pages/HomePage/Home";
import LandingPage from "../pages/landingPage/LandingPage";
import FloatingButton from "../components/FloatingButton";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AddRecipe from "../components/AddRecipe";

export default function Layout() {
  return (
    <>
      <div className="h-screen font-poppins">
        <Navbar />
        <FloatingButton />
        <AddRecipe />
        <Footer />
      </div>
    </>
  );
}
