import { LikeIcon } from "@repo/ui/icons/LikeIcon";
import { SaveIcon } from "@repo/ui/icons/SaveIcon";
import { CircleIcon } from "@repo/ui/icons/CircleIcon";
import { ProfileIcon } from "@repo/ui/icons/profileIcon";
import { useNavigate } from "react-router-dom";
const RecipeCard = ({ recipe }: { recipe: Recipes }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/recipe/${recipe.id}`)}
        className="flex-col items-center w-[250px] cursor-pointer hover:text-orange-400"
      >
        <div className="relative w-full h-[300px] overflow-hidden rounded-2xl group">
          <div className="absolute left-2 top-2 flex items-center gap-1 text-white z-10">
            <LikeIcon className="size-7 stroke-2" />
            {} 23
          </div>
          <div className="absolute right-2 top-2 text-white z-10">
            <SaveIcon />
          </div>
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ease-in-out z-0"
          />
          <div className="absolute bottom-1 left-1 flex items-center z-10">
            {recipe.user.profileImage ? (
              <img
                src={recipe.user.profileImage}
                alt={recipe.user.username}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <ProfileIcon />
              </div>
            )}
            <span className="pl-2 text-md text-white font-semibold">
              {recipe.user.username}
            </span>
          </div>
          <div className="absolute right-2 bottom-2 z-10">
            <CircleIcon />
          </div>
        </div>
        <div className="mt-3 break-words flex justify-between items-center ">
          <h1 className="font-semibold">{recipe.title}</h1>
          <h2 className="text-gray-800 text-xs">{recipe.cookTime}min</h2>
        </div>
      </div>
    </>
  );
};

export interface Recipes {
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

const Recipes = ({ recipes }: { recipes: Recipes[] }) => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-4">
        {recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>
    </>
  );
};

export default Recipes;
