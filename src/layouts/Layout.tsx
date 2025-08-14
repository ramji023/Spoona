import FloatingButton from "../components/FloatingButton";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Signin from "../components/auth/Signin";
export default function Layout() {
  return (
    <>
      <div className=" font-poppins">
        <Navbar />
        <FloatingButton />
        {/* <Signin /> */}
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
