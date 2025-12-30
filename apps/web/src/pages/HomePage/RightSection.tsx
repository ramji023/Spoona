import { useState } from "react";
import { categories, diet, cuisines } from "../../utils/recipe_filters";
import { SearchItemType } from "./Home";

const Badge = ({
  text,
  id,
  addItem,
  searchedItem,
}: {
  text: string;
  id: "cuisine" | "meal" | "time" | "diet";
  addItem: (item: SearchItemType) => void;
  searchedItem: SearchItemType[];
}) => {
  const isSelected = searchedItem.some((i) => i.id === id && i.item === text);

  return (
    <>
      <label
        onClick={() => {
          addItem({ id: id, item: text });
        }}
        className={`outline px-3 py-1 rounded-3xl cursor-pointer transition-all duration-300 ease-in-out  hover:shadow-sm ${
          isSelected
            ? "outline-orange-400 text-orange-400 shadow-lg"
            : "text-gray-600 outline-gray-300"
        }`}
      >
        {text}
      </label>
    </>
  );
};
// const ingredients = ["Tomatoes", "Basil", "Garlic", "Olive Oil", "Parmesan"];

// // components to show ingredients
// const Ingredients = () => {
//   const itemsPerPage = 7;
//   const [visibleCount, setVisibleCount] = useState(itemsPerPage);

//   // Get the categories to show based on current visible count
//   const showIngredients = diet.slice(0, visibleCount);

//   // Check if all items are visible
//   const isAllVisible = visibleCount >= ingredients.length;

//   // Show more items
//   function showMore() {
//     setVisibleCount((prev) => Math.min(prev + itemsPerPage, ingredients.length));
//   }

//   // Collapse to initial state
//   function collapse() {
//     setVisibleCount(itemsPerPage);
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-3">
//         <div>
//           <span className="text-lg font-semibold">Ingredients</span>
//         </div>
//         <div className="flex flex-wrap gap-3 items-center">
//           {showIngredients.map((ingredient, index) => (
//             <Badge text={ingredient} key={index} />
//           ))}

//           {/* Show "More" button if not all visible */}
//           {!isAllVisible && (
//             <span
//               onClick={showMore}
//               className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400 transition-colors"
//             >
//               More
//             </span>
//           )}

//           {/* Show "Collapse" button if showing more than initial */}
//           {visibleCount > itemsPerPage && (
//             <span
//               onClick={collapse}
//               className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400 transition-colors"
//             >
//               Collapse
//             </span>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// components to show cuisines
const Cuisine = ({
  addSearchItem,
  selectedcuisines,
}: {
  addSearchItem: (item: SearchItemType) => void;
  selectedcuisines: SearchItemType[];
}) => {
  const itemsPerPage = 7;
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  // separate selected and unselected categories
  const selectedItems = cuisines.filter((cuisine) =>
    selectedcuisines.some((item) => item.item === cuisine)
  );

  const unselectedItems = cuisines.filter(
    (cuisine) => !selectedcuisines.some((item) => item.item === cuisine)
  );

  // selected first, then unselected
  const sortedCusinies = [...selectedItems, ...unselectedItems];

  // Get the categories to show based on current visible count
  const showCuisines = diet.slice(0, visibleCount);

  // Check if all items are visible
  const isAllVisible = visibleCount >= sortedCusinies.length;

  // Show more items
  function showMore() {
    setVisibleCount((prev) =>
      Math.min(prev + itemsPerPage, sortedCusinies.length)
    );
  }

  // Collapse to initial state
  function collapse() {
    setVisibleCount(itemsPerPage);
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Cuisines</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {showCuisines.map((cuisine, index) => (
            <Badge
              text={cuisine}
              key={index}
              id={"cuisine"}
              addItem={addSearchItem}
              searchedItem={selectedcuisines}
            />
          ))}

          {/* Show "More" button if not all visible */}
          {!isAllVisible && (
            <span
              onClick={showMore}
              className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400 transition-colors"
            >
              More
            </span>
          )}

          {/* Show "Collapse" button if showing more than initial */}
          {visibleCount > itemsPerPage && (
            <span
              onClick={collapse}
              className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400 transition-colors"
            >
              Collapse
            </span>
          )}
        </div>
      </div>
    </>
  );
};

// component to show meal type
const MealType = ({
  addSearchItem,
  selectedMealType,
}: {
  addSearchItem: (item: SearchItemType) => void;
  selectedMealType: SearchItemType[];
}) => {
  const itemsPerPage = 7;
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  // separate selected and unselected categories
  const selectedItems = categories.filter((category) =>
    selectedMealType.some((item) => item.item === category)
  );

  const unselectedItems = categories.filter(
    (category) => !selectedMealType.some((item) => item.item === category)
  );

  // selected first, then unselected
  const sortedCategories = [...selectedItems, ...unselectedItems];

  // Get the categories to show based on current visible count
  const showCategories = sortedCategories.slice(0, visibleCount);

  // Check if all items are visible
  const isAllVisible = visibleCount >= sortedCategories.length;

  // Show more items
  function showMore() {
    setVisibleCount((prev) =>
      Math.min(prev + itemsPerPage, sortedCategories.length)
    );
  }

  // Collapse to initial state
  function collapse() {
    setVisibleCount(itemsPerPage);
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Meal Type</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {showCategories.map((mealType, index) => (
            <Badge
              text={mealType}
              key={index}
              id={"meal"}
              addItem={addSearchItem}
              searchedItem={selectedMealType}
            />
          ))}

          {/* Show "More" button if not all visible */}
          {!isAllVisible && (
            <span
              onClick={showMore}
              className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400 transition-colors"
            >
              More
            </span>
          )}

          {/* Show "Collapse" button if showing more than initial */}
          {visibleCount > itemsPerPage && (
            <span
              onClick={collapse}
              className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400 transition-colors"
            >
              Collapse
            </span>
          )}
        </div>
      </div>
    </>
  );
};

// component to show diets
const Diet = ({
  addSearchItem,
  selectedDiets,
}: {
  addSearchItem: (item: SearchItemType) => void;
  selectedDiets: SearchItemType[];
}) => {
  const itemsPerPage = 7;
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  // separate selected and unselected categories
  const selectedItems = diet.filter((d) =>
    selectedDiets.some((item) => item.item === d)
  );

  const unselectedItems = diet.filter(
    (d) => !selectedDiets.some((item) => item.item === d)
  );

  // selected first, then unselected
  const sortedDiets = [...selectedItems, ...unselectedItems];
  // Get the categories to show based on current visible count
  const showDiets = diet.slice(0, visibleCount);

  // Check if all items are visible
  const isAllVisible = visibleCount >= sortedDiets.length;

  // Show more items
  function showMore() {
    setVisibleCount((prev) =>
      Math.min(prev + itemsPerPage, sortedDiets.length)
    );
  }

  // Collapse to initial state
  function collapse() {
    setVisibleCount(itemsPerPage);
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Diets</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {showDiets.map((diet, index) => (
            <Badge
              text={diet}
              key={index}
              id={"diet"}
              addItem={addSearchItem}
              searchedItem={selectedDiets}
            />
          ))}

          {/* Show "More" button if not all visible */}
          {!isAllVisible && (
            <span
              onClick={showMore}
              className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400 transition-colors"
            >
              More
            </span>
          )}

          {/* Show "Collapse" button if showing more than initial */}
          {visibleCount > itemsPerPage && (
            <span
              onClick={collapse}
              className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400 transition-colors"
            >
              Collapse
            </span>
          )}
        </div>
      </div>
    </>
  );
};

const cookTime = [
  "Under 15 mins",
  "15–30 mins",
  "30–45 mins",
  "45–60 mins",
  "Over 1 hour",
];

const CookTime = ({
  addSearchItem,
  selectedCookTime,
}: {
  addSearchItem: (item: SearchItemType) => void;
  selectedCookTime: SearchItemType[];
}) => {
  // separate selected and unselected categories
  const selectedItems = cookTime.filter((time) =>
    selectedCookTime.some((item) => item.item === time)
  );

  const unselectedItems = cookTime.filter(
    (time) => !selectedCookTime.some((item) => item.item === time)
  );

  // selected first, then unselected
  const sortedCookTime = [...selectedItems, ...unselectedItems];
  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Cook Time</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {sortedCookTime.map((time, index) => (
            <Badge
              text={time}
              key={index}
              id={"time"}
              addItem={addSearchItem}
              searchedItem={selectedCookTime}
            />
          ))}
          {/* <span className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400">
            More
          </span> */}
        </div>
      </div>
    </>
  );
};

// const nutritions = [
//   "Low Calorie",
//   "High Protein",
//   "Low Carb",
//   "High Fiber",
//   "Low Fat",
// ];

// const Nutrition = () => {
//   return (
//     <>
//       <div className="flex flex-col gap-3">
//         <div>
//           <span className="text-lg font-semibold">Nutrition</span>
//         </div>
//         <div className="flex flex-wrap gap-3 items-center">
//           {nutritions.map((nutrition, index) => (
//             <Badge text={nutrition} key={index} />
//           ))}
//           <span className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400">
//             More
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };

// rightsection component
const RightSection = ({
  addSearchItem,
  searchItems,
}: {
  addSearchItem: (item: SearchItemType) => void;
  searchItems: SearchItemType[];
}) => {
  return (
    <>
      <div className="mt-5 pt-10 flex flex-col gap-10">
        {/* <Nutrition /> */}
        <Cuisine
          addSearchItem={addSearchItem}
          selectedcuisines={searchItems.filter((i) => i.id === "cuisine")}
        />
        <CookTime
          addSearchItem={addSearchItem}
          selectedCookTime={searchItems.filter((i) => i.id === "time")}
        />
        <Diet
          addSearchItem={addSearchItem}
          selectedDiets={searchItems.filter((i) => i.id === "diet")}
        />
        <MealType
          addSearchItem={addSearchItem}
          selectedMealType={searchItems.filter((i) => i.id === "meal")}
        />
      </div>
    </>
  );
};

export default RightSection;
