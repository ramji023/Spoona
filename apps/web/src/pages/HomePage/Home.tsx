import { useEffect, useState } from "react";
import Err from "../../errors/ErrorBoundary";
import useMinLoader from "../../hooks/useMinLoader";
import { useRecipes } from "../../react_queries/queries";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { Recipes } from "../../types/recipe";
import { useLocation } from "react-router-dom";
const Home = () => {
  const location = useLocation();
  console.log("location state : ", location, location.state);
  // react query to fetch all the recipes
  const query = useRecipes();
  const { data, isLoading, error } = useMinLoader({ query, loadingTime: 800 });

  const [searchItemArray, setSearchItem] = useState<SearchItemType[]>([]); // state to store all the selected search filters

   // if user click to any categories then show home and show recipes with that catgory filter
  useEffect(() => {
    if (location.state) {
      addSearchItem(location.state);
      // clear the location state after using it
       window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // function to add or remove item in seach array of object
  function addSearchItem(item: SearchItemType) {
    setSearchItem((prev) => {
      // check item is already selected or not
      // compare both id and item
      const itemExists = prev.some(
        (searchItem) =>
          searchItem.id === item.id && searchItem.item === item.item
      );

      //if exist then disselect
      if (itemExists) {
        return prev.filter(
          (searchItem) =>
            !(searchItem.id === item.id && searchItem.item === item.item)
        );
      }

      // if not exist then select it
      return [...prev, item];
    });
  }

  // Filter recipes instantly when searchItemArray or data changes
  const filteredRecipes = data ? filterRecipes(data, searchItemArray) : [];

  // render Err component if there is any error
  if (error) {
    return <Err />;
  }

  return (
    <>
      <div className="mx-4 my-4 flex">
        {/* left section  */}
        <div className="flex-2/3 mr-2 p-3">
          <LeftSection data={filteredRecipes} isLoading={isLoading} />
        </div>
        {/* right section  */}
        <div className="flex-1/3 ml-2 p-4">
          <button
            onClick={() => setSearchItem([])}
            className={`absolute top-40 right-4 text-sm hover:text-orange-400 ${searchItemArray.length === 0 ? `cursor-none text-gray-400` : `cursor-pointer`}`}
          >
            Clear All Filters
          </button>
          <RightSection
            addSearchItem={addSearchItem}
            searchItems={searchItemArray}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

export interface SearchItemType {
  id: "cuisine" | "meal" | "time" | "diet";
  item: string;
}

// Helper function to check if a recipe's cook time matches the selected time range
function matchesCookTimeRange(
  recipeCookTime: string,
  timeRange: string
): boolean {
  const minutes = parseInt(recipeCookTime);

  switch (timeRange) {
    case "Under 15 mins":
      return minutes < 15;
    case "15–30 mins":
      return minutes >= 15 && minutes <= 30;
    case "30–45 mins":
      return minutes > 30 && minutes <= 45;
    case "45–60 mins":
      return minutes > 45 && minutes <= 60;
    case "Over 1 hour":
      return minutes > 60;
    default:
      return false;
  }
}

// Function to filter recipes based on selected search items
function filterRecipes(
  recipes: Recipes[],
  searchItems: SearchItemType[]
): Recipes[] {
  // If no filters selected, return all recipes
  if (searchItems.length === 0) {
    return recipes;
  }

  return recipes.filter((recipe) => {
    // Group search items by their id (type)
    const cuisineFilters = searchItems
      .filter((item) => item.id === "cuisine")
      .map((item) => item.item);
    const mealFilters = searchItems
      .filter((item) => item.id === "meal")
      .map((item) => item.item);
    const timeFilters = searchItems
      .filter((item) => item.id === "time")
      .map((item) => item.item);
    const dietFilters = searchItems
      .filter((item) => item.id === "diet")
      .map((item) => item.item);

    // Check cuisine match (if cuisine filters exist)
    const cuisineMatch =
      cuisineFilters.length === 0 ||
      cuisineFilters.some((cuisine) => recipe.cuisines.includes(cuisine));

    // Check meal type match (if meal filters exist)
    const mealMatch =
      mealFilters.length === 0 ||
      mealFilters.some((meal) => recipe.categories.includes(meal));

    // Check cook time match (if time filters exist)
    const timeMatch =
      timeFilters.length === 0 ||
      timeFilters.some((timeRange) =>
        matchesCookTimeRange(recipe.cookTime, timeRange)
      );

    // Check diet match (if diet filters exist)
    const dietMatch =
      dietFilters.length === 0 ||
      dietFilters.some((diet) => recipe.tags.includes(diet));

    // Recipe must match ALL filter types that have selections
    return cuisineMatch && mealMatch && timeMatch && dietMatch;
  });
}
