import FloatingButton from "@repo/ui/components/FloatingButton";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSuccessMsgStore } from "../stores/successMsgStore";
import SuccessMessage from "@repo/ui/components/popUpModels/SuccessMsg";
import FailureMessage from "@repo/ui/components/popUpModels/FailureMsg";
import { useFailureMsgStore } from "../stores/failureMsgStore";
export default function Layout() {
  const navigate = useNavigate();

  const successMsg = useSuccessMsgStore((s) => s.successMsg);
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);

  const failureMsg = useFailureMsgStore((s) => s.failureMsg);
  const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);
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
        <FailureMessage
          open={failureMsg !== ""}
          msg={failureMsg}
          onClose={() => setFailureMsg("")}
        />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
