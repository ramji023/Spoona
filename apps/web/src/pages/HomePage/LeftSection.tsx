import { motion, AnimatePresence } from "motion/react";
import Recipes from "./Recipes";
import { useRecipes } from "../../react_queries/queries";
import { RecipeCardSkeleton } from "../../loaders/Loaders";
const LeftSection = () => {
  const { data, isLoading, error } = useRecipes();

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
              className="px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-400 "
              defaultValue="popular"
            >
              <option value="popular">Most Popular</option>
              <option value="latest">Latest</option>
              <option value="liked">Most Liked</option>
              <option value="time">Prep Time</option>
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
                <Recipes recipes={data!} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default LeftSection;
