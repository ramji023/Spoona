import { motion, AnimatePresence } from "motion/react";
import Recipes from "./Recipes";
import { RecipeCardSkeleton } from "../../loaders/Loaders";
import { useState } from "react";
interface Recipes {
  id: string;
  title: string;
  cookTime: string;
  imageUrl: string;
  tags: string[];
  cuisines: string[];
  categories: string[];
  user: {
    username: string;
    profileImage: string | null;
  };
}
const LeftSection = ({
  data,
  isLoading,
}: {
  data: Recipes[] | undefined;
  isLoading: boolean;
}) => {
  // state to store selected sorting property
  const [selectedSort, setSelectSort] = useState<
    "all" | "time" | "popular" | "latest" | "liked"
  >("all");
  // function to change value
  const handleSortingChange = (
    value: "all" | "time" | "popular" | "latest" | "liked"
  ) => {
    setSelectSort(value);
  };

  if (data) {
    // sort the recipes
    const sortedRecipe = sortRecipesUtil(data, selectedSort);
    return (
      <>
        <div className="flex flex-col gap-6">
          <div className="mt-2">
            <span className="text-sm text-gray-400">Sponna / Recipes</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold">Recipes</div>
            <div className="flex items-center gap-2">
              <label className="text-md text-gray-800">Sort by:</label>
              <select
                value={selectedSort}
                onChange={(e) =>
                  handleSortingChange(
                    e.target.value as
                      | "all"
                      | "time"
                      | "popular"
                      | "latest"
                      | "liked"
                  )
                }
                className={`${selectedSort !== "all" ? "ring-1 ring-orange-400" : ""} px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-400`}
              >
                <option value="all">All</option>
                <option value="popular">Most Popular</option>
                <option value="latest">Latest</option>
                <option value="liked">Most Liked</option>
                <option value="time">Cook Time</option>
              </select>
            </div>
          </div>
          <div>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap justify-start gap-4"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <RecipeCardSkeleton key={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="recipes-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Recipes recipes={sortedRecipe} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default LeftSection;

function sortRecipesUtil(
  recipes: Recipes[],
  sortBy: "popular" | "latest" | "liked" | "time" | "all"
): Recipes[] {
  // Create a copy to avoid mutating original array
  const result = [...recipes];

  switch (sortBy) {
    // case "mostLiked":
    //   return result.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));

    // case "popular":
    //   return result.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));

    // case "newest":
    //   return result.sort(
    //     (a, b) =>
    //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    //   );

    // return all the recipes
    case "all":
      return result;
    // sort based on cooking time
    case "time":
      return result.sort((a, b) => parseInt(a.cookTime) - parseInt(b.cookTime));

    default:
      return result; // Return as-is
  }
}
