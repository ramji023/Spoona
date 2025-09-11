import { type Value } from "./PlannerPage";
import { ChevronLeft, Plus } from "lucide-react";

const planner = ["Breakfast", "Lunch", "Snacks", "Dinner"];
export default function SetPlan({ value }: { value: Value }) {
  return (
    <>
      <div className="p-6 ">
        {/* first div  */}
        <div className="flex items-center justify-start mb-5">
          <ChevronLeft className="w-10 h-10 text-black" />
          <div className="text-2xl">
            {" "}
            {value instanceof Date
              ? value.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })
              : "Multiple dates selected"}
          </div>
        </div>
        {/* second div  */}
        <div>
          {planner.map((plan) => (
            <PlanItems text={plan} />
          ))}
        </div>
      </div>
    </>
  );
}

function PlanItems({ text }: { text: string }) {
  return (
    <>
      <div className="flex justify-between items-center text-gray-400 px-2 py-2 my-2">
        <p className="text-2xl">{text}</p>
        <Plus className="w-10 h-10 p-2 cursor-pointer hover:bg-gray-200 hover:rounded-full hover:text-gray-600" />
      </div>
    </>
  );
}
