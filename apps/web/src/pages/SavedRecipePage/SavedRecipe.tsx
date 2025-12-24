import EmptyPage from "@repo/ui/components/EmptyPage";
import { DownArrowIcon } from "@repo/ui/icons/ChevronIcon";
import { FilterIcon } from "@repo/ui/icons/FilterIcon";
import { LeftArrowIcon } from "@repo/ui/icons/LeftArrowIcon";
import { useSavedRecipes } from "../../react_queries/queries";
import Recipes from "../HomePage/Recipes";
import useMinLoader from "../../hooks/useMinLoader";
import Err from "../../errors/ErrorBoundary";
import { SavedRecipesSkeleton } from "../../loaders/Loaders";

const SavedRecipe = () => {
  const query = useSavedRecipes();
  const { data, isLoading, error } = useMinLoader({ query, loadingTime: 800 });
  if (error) {
    return <Err />;
  }

  if (isLoading) {
    return <SavedRecipesSkeleton />;
  }
  return (
    <>
      <div className="mx-20 p-10  flex flex-col gap-4">
        {/* first div  */}
        <div className="flex justify-between my-2">
          <div className="flex items-center gap-1">
            <LeftArrowIcon />
            <h1 className="text-3xl font-semibold">Saved</h1>
          </div>

          <button className="text-lg font-semibold  cursor-pointer bg-orange-400 text-white outline-gray-400 outline  rounded-3xl px-6 py-2 mx-3 ">
            Add
          </button>
        </div>
        {/* second div  */}
        <div className="my-3 flex items-center gap-3 ">
          <input
            type="text"
            placeholder="Search Recipe"
            className="w-[90%] h-[45px] rounded-4xl bg-gray-200 focus:outline-orange-400 px-4"
          />
          <div className="outline-2 outline-gray-200 rounded-3xl  flex justify-center items-center px-4 py-2 hover:outline-orange-400">
            <FilterIcon />
          </div>
        </div>
        <div className="my-3 border border-solid border-gray-300"></div>
        {/* third div  */}
        <div className="my-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Recipes</h1>
            <div className="flex gap-1 items-center cursor-pointer">
              <span className="text-md">All</span>
              <DownArrowIcon />
            </div>
          </div>
        </div>
        {/* forth div  */}
        {data ? (
          <>
            <Recipes
              recipes={data.map((s) => ({
                id: s.recipe.id,
                title: s.recipe.title,
                cookTime: s.recipe.cookTime,
                imageUrl: s.recipe.imageUrl,
                tags: s.recipe.tags,
                cuisines: s.recipe.cuisines,
                categories: s.recipe.categories,
                user: s.recipe.user,
              }))}
            />
          </>
        ) : (
          <div>
            <EmptyPage
              message="Save recipes from anywhere to your personal recipe box!"
              button="Save Recipe"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SavedRecipe;
