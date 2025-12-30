import { useState } from "react";
import { type Value } from "./PlannerPage";
import { ChevronDown, ChevronLeft, ChevronUp, Plus } from "lucide-react";
import { PlannerForm } from "./PlannerForm";
import { PlannerData } from "../../types/planner";

const planner = ["Breakfast", "Lunch", "Snacks", "Dinner"];
export default function SetPlan({
  value,
  data,
}: {
  value: Value;
  data: PlannerData[];
}) {
  // filter planner data according to set date
  const selectedDate = value instanceof Date ? value : null;
  const filteredData = selectedDate
    ? data.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === selectedDate.toDateString();
      })
    : [];

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
          {planner.map((plan, index) => {
            // filter data for this meal type
            const mealData = filteredData.filter((item) => item.type === plan);

            return (
              <PlanItems
                key={index}
                text={plan}
                date={value instanceof Date ? value : undefined}
                mealData={mealData}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}



function PlanItems({
  text,
  date,
  mealData,
}: {
  text: string;
  date?: Date;
  mealData: PlannerData[];
}) {
  const [plannerForm, setPlannerForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="border-b border-gray-200">
        {/* Header with Plus and Accordion Toggle */}
        <div className="flex justify-between items-center text-gray-400 px-2 py-2 my-2">
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-2xl">{text}</h1>
            {mealData.length > 0 && (
              <span className="text-sm bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center">
                {mealData.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Plus
              onClick={() => setPlannerForm(true)}
              className="w-10 h-10 p-2 cursor-pointer hover:bg-gray-200 hover:rounded-full hover:text-gray-600"
            />
            {mealData.length > 0 && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 p-2 cursor-pointer hover:bg-gray-200 hover:rounded-full hover:text-gray-600"
              >
                {isOpen ? (
                  <ChevronUp className="w-full h-full" />
                ) : (
                  <ChevronDown className="w-full h-full" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Accordion Content */}
        {isOpen && mealData.length > 0 && (
          <div className="px-2 pb-4 space-y-3">
            {mealData.map((meal, index) => (
              <MealCard key={index} meal={meal} />
            ))}
          </div>
        )}
      </div>

      {/* Planner Form Modal */}
      {plannerForm && (
        <PlannerForm
          open={plannerForm}
          close={() => setPlannerForm(false)}
          type={text}
          date={date}
        />
      )}
    </>
  );
}

// Meal Card Component
function MealCard({ meal }: { meal: PlannerData }) {
  if (meal.foodData) {
    // Show recipe card
    return (
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white shadow-sm border border-gray-200">
        {/* Left Side - Image */}
        <img
          src={meal.foodData.imageUrl}
          alt={meal.foodData.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        {/* Right Side - Title */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-800">
            {meal.foodData.title}
          </h3>
          <p className="text-xs text-gray-500 truncate">Added from Recipe</p>
        </div>
      </div>
    );
  }

  if (meal.foodUrl) {
    // Show URL/Note card
    return (
      <div className="px-3 py-3 rounded-lg bg-white shadow-sm border border-gray-200">
        <p className="text-sm text-gray-800 break-words">{meal.foodUrl}</p>
        <p className="text-xs text-gray-500 mt-1">Custom Note</p>
      </div>
    );
  }

  return null;
}