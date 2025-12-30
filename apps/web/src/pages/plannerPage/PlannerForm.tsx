import { CrossIcon } from "@repo/ui/icons/CrossIcon";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axiosInstance";
import { useSuccessMsgStore } from "../../stores/successMsgStore";
import { useFailureMsgStore } from "../../stores/failureMsgStore";
import { useRef, useState } from "react";
import { PlannerInput } from "../../types/planner";
import { AxiosError } from "axios";

interface PropType {
  open: boolean;
  close: () => void;
  type?: string;
  date?: Date;
  recipeData?: {
    id: string;
    recipeImage: string;
    title: string;
  };
}

export const PlannerForm = (prop: PropType) => {
  // write state to manage input value
  const mealUrlRef = useRef<HTMLTextAreaElement | null>(null);
  // write state to manage error
  const [error, setError] = useState("");
  // function to set success message
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);
  // function to set failure message
  const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);

  // manage value state when user click select planner type
  const [plannerType, setPlannerType] = useState("Breakfast");
  // manage date state in planner form
  const [date, setDate] = useState("");
  //write mutation to add planner item
  const plannerMutation = useMutation({
    mutationFn: async (data: PlannerInput) => {
      const response = await api.post("/api/v1/planner", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("response from server : ", data);
      setSuccessMsg("You have successfully set the planner");
      setError("");
      mealUrlRef.current = null;
      prop.close();
    },
    onError: (err: Error | any) => {
      if (err instanceof AxiosError) {
        if (err.response) {
          setFailureMsg(
            err.response.data?.message ||
              "Something went wrong. Please try again."
          );
        } else if (err.request) {
          setFailureMsg("No response from server. Please try again.");
        } else {
          console.log(err.message);
          setFailureMsg(err.message || "An unexpected error occurred");
        }
      } else {
        setFailureMsg("An unexpected error occurred");
      }
      prop.close();
    },
  });

  // when user click to save button then run this function
  function handlePlannerCreation() {
    // if type of planner present in prop
    if (prop.type && prop.date && mealUrlRef.current) {
      if (mealUrlRef.current.value === "") {
        setError("Please enter meal");
        return;
      }
      const data = {
        date: prop.date,
        type: prop.type,
        foodUrl: mealUrlRef.current.value,
      };
      plannerMutation.mutate(data);
    }
    // if recipe data present in prop then
    if (prop.recipeData) {
      if (date === "") {
        setError("Please select date");
        return;
      }
      const data = {
        date: new Date(date),
        type: plannerType,
        food: prop.recipeData.id,
      };
      plannerMutation.mutate(data);
    }
  }

  if (!prop.open) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] z-100">
        <div className="bg-gray-200 rounded-xl p-6 w-[470px] h-[470px] flex flex-col gap-5">
          {/* first div  */}
          <div className="text-2xl font-semibold flex justify-between items-center">
            <h1>Make Planner</h1>
            <div
              onClick={() => prop.close()}
              className="text-gray-700 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300"
            >
              <CrossIcon />
            </div>
          </div>
          {/* error div  */}
          <div className="min-h-[13px]">
            <span className="text-sm text-red-500 flex items-center justify-center">
              {error}
            </span>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {prop.date ? (
              <>
                {/* Date Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    value={formatDate(prop.date)}
                    className="px-3 py-2 rounded-lg outline-1 focus:outline-orange-400"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Date Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    className="px-3 py-2 rounded-lg outline-1 focus:outline-orange-400"
                  />
                </div>
              </>
            )}

            {prop.type ? (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    select Meal Type
                  </label>
                  <input
                    type="text"
                    value={prop.type}
                    className="px-3 py-2 rounded-lg outline-1 focus:outline-orange-400"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Type Select */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Meal Type
                  </label>
                  <select
                    value={plannerType}
                    onChange={(e) => setPlannerType(e.target.value)}
                    className="px-3 py-2 rounded-lg outline-1 focus:outline-orange-400"
                  >
                    <>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Snacks">Snacks</option>
                    </>
                  </select>
                </div>
              </>
            )}

            {prop.recipeData ? (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Selected Meal
                  </label>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white shadow-sm h-[88px]">
                    {/* Left Side - Image */}
                    <img
                      src={prop.recipeData.recipeImage}
                      alt={prop.recipeData.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    {/* Right Side - Title */}
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {prop.recipeData.title}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        Added from Recipe
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Meal URL / Note */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Meal URL / Note
                  </label>
                  <textarea
                    ref={mealUrlRef}
                    placeholder="Paste Spoona Recipe URL or write a note..."
                    rows={3}
                    className="px-3 py-2 rounded-lg outline-1 focus:outline-orange-400 resize-none"
                  />
                </div>
              </>
            )}
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => prop.close()}
              className="px-3 py-2 outline-1 rounded-3xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlePlannerCreation}
              disabled={plannerMutation.isPending}
              className={`px-3 py-2 rounded-3xl outline-orange-400 outline-1 text-white bg-orange-400 flex items-center justify-center gap-2 ${
                plannerMutation.isPending
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {plannerMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving</span>
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
