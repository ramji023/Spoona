import FloatingButton from "@repo/ui/components/FloatingButton";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import { useState } from "react";
export default function Layout() {
  const navigate = useNavigate();
  const [signUpOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  return (
    <>
      <div className=" font-poppins">
        <Navbar signup={setSignupOpen} signin={setSigninOpen} />
        <FloatingButton onClick={() => navigate("/add-recipe")} />
        <Signin
          open={signinOpen}
          signup={setSignupOpen}
          signin={setSigninOpen}
        />
        <Signup
          open={signUpOpen}
          signup={setSignupOpen}
          signin={setSigninOpen}
        />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
