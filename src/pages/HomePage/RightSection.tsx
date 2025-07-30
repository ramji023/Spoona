const Badge = ({ text }: { text: string }) => {
  return (
    <>
      <label className="outline-1 px-3 py-1 rounded-3xl text-gray-600 cursor-pointer transition-all duration-300 ease-in-out hover:outline-orange-400 hover:shadow-sm hover:text-orange-400">
        {text}
      </label>
    </>
  );
};

const ingredients = ["Tomatoes", "Basil", "Garlic", "Olive Oil", "Parmesan"];
const Ingredients = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Ingredients</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {ingredients.map((ingredient, index) => (
            <Badge text={ingredient} key={index} />
          ))}
          <span className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400">
            More
          </span>
        </div>
      </div>
    </>
  );
};

const mealType = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const MealType = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Meal Type</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {mealType.map((mealType, index) => (
            <Badge text={mealType} key={index} />
          ))}
          <span className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400">
            More
          </span>
        </div>
      </div>
    </>
  );
};

const diets = ["Vegan", "Vegetarian", "Keto", "Gluten-Free", "Paleo"];

const Diet = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Diet</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {diets.map((diet, index) => (
            <Badge text={diet} key={index} />
          ))}
          <span className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400">
            More
          </span>
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

const CookTime = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Cook Time</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {cookTime.map((time, index) => (
            <Badge text={time} key={index} />
          ))}
          <span className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400">
            More
          </span>
        </div>
      </div>
    </>
  );
};

const cuisines = ["Italian", "Mexican", "Indian", "Thai", "Mediterranean"];

const Cuisine = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Cuisine</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {cuisines.map((cuisine, index) => (
            <Badge text={cuisine} key={index} />
          ))}
          <span className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400">
            More
          </span>
        </div>
      </div>
    </>
  );
};

const nutritions = [
  "Low Calorie",
  "High Protein",
  "Low Carb",
  "High Fiber",
  "Low Fat",
];

const Nutrition = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-lg font-semibold">Nutrition</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {nutritions.map((nutrition, index) => (
            <Badge text={nutrition} key={index} />
          ))}
          <span className="text-gray-400 font-semibold cursor-pointer hover:text-orange-400">
            More
          </span>
        </div>
      </div>
    </>
  );
};
const RightSection = () => {
  return (
    <>
      <div className="mt-5 pt-10 flex flex-col gap-10">
        <Ingredients />
        <Nutrition />
        <Cuisine />
        <CookTime />
        <Diet />
        <MealType />
      </div>
    </>
  );
};

export default RightSection;
