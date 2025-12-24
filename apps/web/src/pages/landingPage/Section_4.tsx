import Recipes from "../HomePage/Recipes";
import { useRecipes } from "../../react_queries/queries";
import { motion, AnimatePresence } from "motion/react";
import { RecipeCardSkeleton } from "../../loaders/Loaders";
// import { useFailureMsgStore } from "../../stores/failureMsgStore";
import useMinLoader from "../../hooks/useMinLoader";
export default function Section_4() {
  // call the query function to fetch all the recipes
  const query = useRecipes();
  const { data, isLoading, error } = useMinLoader({ query, loadingTime: 800 });
 
  return (
    <>
      <div className="mx-25 my-10 p-2 font-poppins flex-col space-y-10">
        <div>
          <div className="font-semibold flex justify-between items-center">
            <h1 className="text-2xl ">Discover Recipes</h1>
            <span className="text-gray-400 text-md cursor-pointer hover:text-orange-400">
              See More
            </span>
          </div>
          <div className="text-lg text-gray-400 ">
            Find and share everyday cooking inspiration with ratings and reviews
            you can trust. Recipes for easy dinners, healthy eating, fast and
            cheap, kid-friendly, and more.
          </div>
        </div>
        {error ? (
          <div className="text-3xl text-center h-[100px]">
            Couldn't fetch the Recipies
          </div>
        ) : (
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
        )}
        {/* <div className="border border-gray-200"></div> */}
      </div>
    </>
  );
}
