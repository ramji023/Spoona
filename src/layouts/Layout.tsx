import FloatingButton from "../components/FloatingButton";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RecipeBox from "../components/RecipeBox";
export default function Layout() {
  return (
    <>
      <div className="h-screen font-poppins">
        <Navbar />
        <FloatingButton />
        <RecipeBox />
        <Footer />
      </div>
    </>
  );
}
