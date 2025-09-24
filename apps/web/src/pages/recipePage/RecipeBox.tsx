import { EditIcon } from "@repo/ui/icons/EditIcon";
import { EllipseIcon } from "@repo/ui/icons/EllipseIcon";
import { PrinterIcon } from "@repo/ui/icons/PrinterIcon";
import { SaveIcon } from "@repo/ui/icons/SaveIcon";
import { ShareIcon } from "@repo/ui/icons/ShareIcon";
import { ProfileIcon } from "@repo/ui/icons/profileIcon";
import { NotesSection } from "./NotesSection";
import { useRecipe } from "../../react_queries/queries";
import { ingredientsMap } from "../../utils/ingredientsMap";
import { api } from "../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

const RecipeBox = () => {
  //react query for savedRecipe
  const savedRecipeMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        `/api/v1/recipe/74b75485-bc16-4d12-a40b-6d7c92585de7/saved-recipe`,
        null
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("saved recipe response : ", data);
    },
    onError: (err) => {
      console.log("error : ", err);
    },
  });
  function sendSavedRecipe() {
    savedRecipeMutation.mutate();
  }

  // fetch recipe
  const { data, isLoading, error } = useRecipe(
    "74b75485-bc16-4d12-a40b-6d7c92585de7"
  );

  if (isLoading) {
    console.log("recipe is loading");
  }

  if (!data || error) {
    console.log("recipe fetching error" + error);
    return <div className="text-6xl">Something is messedup</div>;
  }

  if (data) {
    console.log("successfully fetch recipe data : ", data);
    return (
      <>
        <div className="m-5 px-5 py-4">
          {/* first section  */}
          <div className="flex gap-5 my-4">
            {/* recipe image  */}
            <div className="flex-1/2 ">
              <img
                className="h-[500px] w-full object-cover rounded"
                src={data.imageUrl}
                alt={data.title}
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
                    <button
                      onClick={sendSavedRecipe}
                      className="text-lg font-semibold  cursor-pointer text-gray-800 outline-gray-400 outline  rounded-3xl px-6 py-2 mx-3 "
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    {data.user.profileImage ? (
                      <img
                        src={data.user.profileImage}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <ProfileIcon />
                    )}
                  </div>
                  <div className="flex gap-1">
                    <span>By</span>
                    <span className="text-md font-semibold hover:text-orange-400 cursor-pointer">
                      {data.user.username}
                    </span>
                  </div>
                </div>
                <div className="text-5xl font-semibold text-gray-800">
                  {data.title}
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
                      <span>{`${data.prepTime}Min`}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-lg">Cook: </span>
                      <span>{`${data.cookTime}Min`}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{data.description}</div>
              </div>
            </div>
          </div>
          {/* second section  */}
          <div className="flex gap-5 my-4">
            {/* show ingredients  */}
            <div className="flex-1 p-4">
              <h1 className="text-2xl font-semibold">Ingredients</h1>
              {data.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-3 p-5 items-center">
                  <div className="text-3xl">
                    {ingredientsMap[ingredient.name.toLowerCase()] ? (
                      <div>
                        <img
                          src={ingredientsMap[ingredient.name.toLowerCase()]}
                          alt=""
                          className="w-[40px] h-[40px] object-cover"
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          src={ingredientsMap[`others`]}
                          alt=""
                          className="w-[40px] h-[40px] object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="font-semibold">{ingredient.name}</h1>
                    <p className="text-xs text-gray-500">
                      {ingredient.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* show instruction  */}
            <div className="flex-3 p-4">
              <h1 className="text-2xl font-semibold">Instructions</h1>
              {data.instructions.map((instruction, index) => (
                <div key={index} className=" flex flex-col p-5">
                  <span className="font-semibold">
                    Step- {index}
                    <span className="ml-2 font-normal">{instruction.step}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* third section - notes section  */}
          <div className="border-solid border-t-1 border-gray-400 p-5">
            <NotesSection />
          </div>
        </div>
      </>
    );
  }
};

export default RecipeBox;
