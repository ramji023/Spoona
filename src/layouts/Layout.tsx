import FloatingButton from "../components/FloatingButton";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  
  return (
    <>
      <div className=" font-poppins">
        <Navbar />
        <FloatingButton />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
