import { EditIcon } from "@repo/ui/icons/EditIcon";
import { EllipseIcon } from "@repo/ui/icons/EllipseIcon";
import { PrinterIcon } from "@repo/ui/icons/PrinterIcon";
import { SaveIcon } from "@repo/ui/icons/SaveIcon";
import { ShareIcon } from "@repo/ui/icons/ShareIcon";
import { NotesSection, NoteInput } from "./NotesSection";
import { useRecipe } from "../../react_queries/queries";
import { Recipe } from "../../types/recipe";
interface IngredientsType {
  icon: string;
  name: string;
  subText: string;
}
interface InstructionType {
  index: number;
  text: string;
}
interface RecipeType {
  imageUrl: string;
  title: string;
  description: string;
  ingredients: IngredientsType[];
  instruction: InstructionType[];
  prepTime: string;
  cookTime: string;
  creatorName: string;
  avatar: string;
  createdAt: Date;
}
const sampleRecipe: RecipeType = {
  imageUrl:
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80", // Creamy tomato pasta
  title: "Creamy Tomato Basil Pasta",
  description:
    "A comforting and creamy tomato basil pasta made with fresh ingredients, a hint of garlic and spice, and fresh basil. Perfect for a cozy dinner with family or friends.",
  ingredients: [
    {
      icon: "🍅",
      name: "Tomatoes",
      subText: "4 large ripe tomatoes, finely chopped",
    },
    { icon: "🧄", name: "Garlic", subText: "3 cloves, minced" },
    { icon: "🥛", name: "Heavy Cream", subText: "1 cup for rich creaminess" },
    {
      icon: "🌿",
      name: "Fresh Basil",
      subText: "Handful of chopped basil leaves",
    },
    {
      icon: "🍝",
      name: "Pasta",
      subText: "250g penne or fusilli, cooked al dente",
    },
    { icon: "🧈", name: "Butter", subText: "2 tablespoons for sautéing" },
    { icon: "🧀", name: "Parmesan", subText: "Grated, for serving" },
    { icon: "🧂", name: "Salt & Pepper", subText: "To taste" },
  ],
  instruction: [
    {
      index: 1,
      text: "Boil pasta in salted water until al dente. Drain and set aside.",
    },
    {
      index: 2,
      text: "In a pan, melt butter and sauté garlic until fragrant.",
    },
    {
      index: 3,
      text: "Add chopped tomatoes and cook for 7–8 minutes until softened.",
    },
    {
      index: 4,
      text: "Stir in heavy cream and simmer gently for 2–3 minutes.",
    },
    {
      index: 5,
      text: "Add chopped basil, salt, and pepper. Simmer another 5 minutes.",
    },
    { index: 6, text: "Toss in cooked pasta and stir to coat evenly." },
    {
      index: 7,
      text: "Serve hot with freshly grated Parmesan and basil leaves.",
    },
  ],
  prepTime: "15 mins",
  cookTime: "25 mins",
  creatorName: "Aarav Sharma",
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png", // generic profile
  createdAt: new Date("2025-07-20T18:35:00"),
};

const RecipeBox = () => {
  const { data, isLoading, error } = useRecipe(
    "74b75485-bc16-4d12-a40b-6d7c92585de7"
  );

  if (isLoading) {
    console.log("recipe is loading");
  }

  if (error) {
    console.log("recipe fetching error" + error);
  }

  if (data) {
    console.log("successfully fetch recipe data : ", data);
  }

  return (
    <>
      <div className="m-5 px-5 py-4">
        {/* first section  */}
        <div className="flex gap-5 my-4">
          {/* recipe image  */}
          <div className="flex-1/2 ">
            <img
              className="h-[500px] w-full object-cover rounded"
              src={sampleRecipe.imageUrl}
              alt={sampleRecipe.title}
            />
          </div>
          {/* recipe raw data  */}
          <div className="flex-1/2 p-5 ">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between p-2">
                <div className="flex gap-5 items-center">
                  <EditIcon />
                  <PrinterIcon />
                  <EllipseIcon />
                </div>
                <div className="flex items-center">
                  <button className="text-lg font-semibold bg-orange-400 cursor-pointer text-white  rounded-3xl px-6 py-2 mx-3 ">
                    Plan
                  </button>
                  <button className="text-lg font-semibold  cursor-pointer text-gray-800 outline-gray-400 outline  rounded-3xl px-6 py-2 mx-3 ">
                    Save
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <img
                    src={sampleRecipe.avatar}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex gap-1">
                  <span>By</span>
                  <span className="text-md font-semibold hover:text-orange-400 cursor-pointer">
                    {sampleRecipe.creatorName}
                  </span>
                </div>
              </div>
              <div className="text-5xl font-semibold text-gray-800">
                {sampleRecipe.title}
              </div>
              <div className="flex gap-10">
                <div className="text-orange-400 flex items-center">
                  <SaveIcon />
                  <span className="font-semibold text-black ml-1"> 10K</span>
                </div>
                <div className="text-orange-400 flex items-center">
                  <ShareIcon />
                  <span className="font-semibold text-black ml-1">Share</span>
                </div>
              </div>
              <div className="border-solid border-t-1 border-b-1 border-gray-300 flex justify-between py-3">
                <div className="font-semibold text-lg">Description</div>
                <div className="flex gap-4">
                  <div>
                    <span className="text-gray-500 text-lg">Prep: </span>
                    <span>17min</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-lg">Cook: </span>
                    <span>13min</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {sampleRecipe.description}
              </div>
            </div>
          </div>
        </div>
        {/* second section  */}
        <div className="flex gap-5 my-4">
          {/* show ingredients  */}
          <div className="flex-1 p-4">
            <h1 className="text-2xl font-semibold">Ingredients</h1>
            {sampleRecipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-3 p-5 items-center">
                <div className="text-3xl">{ingredient.icon}</div>
                <div>
                  <h1 className="font-semibold">{ingredient.name}</h1>
                  <p className="text-xs text-gray-500">{ingredient.subText}</p>
                </div>
              </div>
            ))}
          </div>
          {/* show instruction  */}
          <div className="flex-3 p-4">
            <h1 className="text-2xl font-semibold">Instructions</h1>
            {sampleRecipe.instruction.map((instruction) => (
              <div key={instruction.index} className=" flex flex-col p-5">
                <span className="font-semibold">
                  Step- {instruction.index}
                  <span className="ml-2 font-normal">{instruction.text}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* third section - notes section  */}
        <div className="border-solid border-t-1 border-gray-400 p-5">
          <NotesSection />
          <NoteInput />
        </div>
      </div>
    </>
  );
};

export default RecipeBox;
