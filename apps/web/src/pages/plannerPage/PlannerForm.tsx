import { CrossIcon } from "@repo/ui/icons/CrossIcon";

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
            <span className="text-xs text-red-500 flex items-center justify-center">
              Error occured
            </span>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Date Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                defaultValue={formatDate(prop.date ?? new Date())}
                className="px-3 py-2 rounded-lg outline-1 focus:outline-orange-400"
              />
            </div>

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
                  <select className="px-3 py-2 rounded-lg outline-1 focus:outline-orange-400">
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
            <button className="px-3 py-2 rounded-3xl outline-orange-400 outline-1 text-white bg-orange-400 cursor-pointer">
              Save
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
