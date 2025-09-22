import FloatingButton from "@repo/ui/components/FloatingButton";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSuccessMsgStore } from "../stores/successMsgStore";
import SuccessMessage from "@repo/ui/components/popUpModels/SuccessMsg";
export default function Layout() {
  const navigate = useNavigate();
 
  const successMsg = useSuccessMsgStore((s) => s.successMsg);
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);
  return (
    <>
      <div className=" font-poppins">
        <Navbar />
        <FloatingButton onClick={() => navigate("/add-recipe")} />
        <SuccessMessage
          open={successMsg !== ""}
          msg={successMsg}
          onClose={() => setSuccessMsg("")}
        />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
