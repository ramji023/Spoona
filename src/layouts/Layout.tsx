import Home from "../pages/HomePage.tsx/Home";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <div className="h-screen font-poppins">
        <Navbar />
        <Home />
        <Footer />
      </div>
    </>
  );
}
