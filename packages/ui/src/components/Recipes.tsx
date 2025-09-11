import { LikeIcon } from "../icons/LikeIcon";
import { SaveIcon } from "../icons/SaveIcon";
import { CircleIcon } from "../icons/CircleIcon";
import recipe_1 from "../../public/recipes/recipe_1.jpg";
import recipe_2 from "../../public/recipes/recipe_2.jpg";
import recipe_3 from "../../public/recipes/recipe_3.jpg";
import recipe_4 from "../../public/recipes/recipe_4.jpg";
import recipe_5 from "../../public/recipes/recipe_5.jpg";
import recipe_6 from "../../public/recipes/recipe_6.jpg";
import recipe_7 from "../../public/recipes/recipe_7.jpg";
import saladImage from "../../public/recipe_categories/salad.jpeg";
interface RecipeProps {
  recipeTitle: string;
  imagePath: string;
  time: string;
  creatorName: string;
  ingredients: number;
  like: number;
  avatar: string;
}
const recipes: RecipeProps[] = [
  {
    recipeTitle: "Spicy Chickpea Curry",
    imagePath: recipe_1,
    time: "30 min",
    creatorName: "Meera Sharma",
    ingredients: 10,
    like: 124,
    avatar: "https://i.pravatar.cc/150?u=A",
  },
  {
    recipeTitle: "Classic Margherita Pizza",
    imagePath: recipe_2,
    time: "45 min",
    creatorName: "Luca Bianchi",
    ingredients: 7,
    like: 210,
    avatar: "https://i.pravatar.cc/150?u=L",
  },
  {
    recipeTitle: "Creamy Mushroom Pasta",
    imagePath: recipe_3,
    time: "25 min",
    creatorName: "Emily Carter",
    ingredients: 9,
    like: 158,
    avatar: "https://i.pravatar.cc/150?u=E",
  },
  {
    recipeTitle: "Grilled Tofu Skewers",
    imagePath: recipe_4,
    time: "35 min",
    creatorName: "Aarav Patel",
    ingredients: 8,
    like: 97,
    avatar: "https://i.pravatar.cc/150?u=A",
  },
  {
    recipeTitle: "Avocado Toast Deluxe",
    imagePath: recipe_5,
    time: "15 min",
    creatorName: "Sophia Nguyen",
    ingredients: 6,
    like: 132,
    avatar: "https://i.pravatar.cc/150?u=S",
  },
  {
    recipeTitle: "Stuffed Bell Peppers",
    imagePath: recipe_6,
    time: "50 min",
    creatorName: "Carlos Reyes",
    ingredients: 12,
    like: 89,
    avatar: "https://i.pravatar.cc/150?u=H",
  },
  {
    recipeTitle: "Blueberry Oatmeal Bake",
    imagePath: recipe_7,
    time: "40 min",
    creatorName: "Hannah Kim",
    ingredients: 11,
    like: 143,
    avatar: "https://i.pravatar.cc/150?u=Z",
  },
  {
    recipeTitle: "Salad",
    imagePath: saladImage,
    time: "20 min",
    creatorName: "Zassicca",
    ingredients: 18,
    like: 256,
    avatar: "https://i.pravatar.cc/150?u=K",
  },
];

const RecipeCard = (props:any) => {
  return (
    <>
      <div className="flex-col items-center w-[250px] cursor-pointer hover:text-orange-400">
        <div className="relative w-full h-[300px] overflow-hidden rounded-2xl group">
          <div className="absolute left-2 top-2 flex items-center gap-1 text-white z-10">
            <LikeIcon />
            {props.recipe.like}
          </div>
          <div className="absolute right-2 top-2 text-white z-10">
            <SaveIcon />
          </div>
          <img
            src={props.recipe.imagePath}
            alt={props.recipe.recipeTitle}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ease-in-out z-0"
          />
          <div className="absolute bottom-1 left-1 flex items-center z-10">
            <img
              src={props.recipe.avatar}
              alt={props.recipe.creatorName}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <span className="pl-2 text-md text-white font-semibold">
              {props.recipe.creatorName}
            </span>
          </div>
          <div className="absolute right-2 bottom-2 z-10">
            <CircleIcon />
          </div>
        </div>
        <div className="mt-3 break-words flex justify-between items-center ">
          <h1 className="font-semibold">{props.recipe.recipeTitle}</h1>
          <h2 className="text-gray-800 text-xs">{props.recipe.time}</h2>
        </div>
      </div>
    </>
  );
};

const Recipes = () => {
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
