import com_1 from "../../../public/communities/com_01.jpg";
import {
  ArrowLeft,
  Share2,
  Ellipsis,
  UtensilsCrossed,
  Plus,
} from "lucide-react";
import { User } from "lucide-react";
import Button from "@repo/ui/components/Button";
import { FilterIcon } from "@repo/ui/icons/FilterIcon";
import { useRecipes } from "../../react_queries/queries";
import Recipes from "../HomePage/Recipes";
export default function Community() {
  const { data, isLoading, error } = useRecipes();
  if (isLoading) {
    console.log("recipe is loading");
  }
  if (!data || error) {
    console.log("recipe fetching error" + error);
    return <div className="text-6xl">Something is messedup</div>;
  }
  return (
    <>
      <div className="mx-40 my-8 p-2">
        {/* first div  */}
        <div className="relative">
          <img
            src={com_1}
            alt=""
            className="h-[200px] w-full object-cover rounded-lg"
          />
          <div className="absolute bottom-2 left-2 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full text-white flex justify-center items-center hover:bg-white hover:text-black">
              <ArrowLeft className="stroke-2" />
            </div>
            <h1 className="text-3xl text-white">Quick & Simple</h1>
          </div>
          <div className="absolute bottom-2 right-4 flex items-center justify-center gap-3">
            <div>
              <Button onClick={() => {}}>
                <span className="font-normal">join</span>
              </Button>
            </div>
            <div className="w-10 h-10 rounded-full  flex justify-center items-center bg-white hover:text-black">
              <Share2 className="stroke-2" />
            </div>
            <div className="w-10 h-10 rounded-full  flex justify-center items-center bg-white hover:text-black">
              <Ellipsis className="stroke-2" />
            </div>
          </div>
        </div>
        {/* second div  */}
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4 ">
            <div className="text-gray-600 flex items-center gap-2">
              <User className="w-5 h-5" />
              <p>
                3456 <span className="text-sm">members</span>
              </p>
            </div>
            <div className="text-gray-600 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" />
              <p>
                1012 <span className="text-sm">recipes</span>
              </p>
            </div>
          </div>
          <div>
            <Button onClick={() => {}}>
              <div className="flex items-center gap-1 font-normal">
                <Plus className="w-5 h-5" /> Add Recipe
              </div>
            </Button>
          </div>
        </div>

        {/* third div  */}
        <div className="my-3 flex items-center gap-3 justify-center">
          <input
            type="text"
            placeholder="Search Popular Recipe in Quick & Simple"
            className="w-[90%] h-[45px] rounded-4xl bg-gray-200 focus:outline-orange-400 px-4"
          />
          <div className="outline-2 outline-gray-200 rounded-3xl  flex justify-center items-center px-4 py-2 hover:outline-orange-400">
            <FilterIcon />
          </div>
        </div>

        {/* forth div  */}
        <div className="py-4">
          <h1 className="text-2xl py-4 font-semibold text-orange-400">
            Recipes
          </h1>
          <div className="border-b-2  border-gray-400"></div>
        </div>

        {/* fifth div  */}

        <div className="flex flex-row justify-center">
          <Recipes recipes={data} />
        </div>
      </div>
    </>
  );
}
