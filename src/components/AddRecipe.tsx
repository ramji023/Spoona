import { LeftArrowIcon } from "../icons/LeftArrowIcon";
import { Box, InputBox, InputBoxVariant, TextAreaBox } from "./InputBox";
const AddRecipe = () => {
  return (
    <>
      <div className="m-15 px-15 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <LeftArrowIcon />
            <label className="text-2xl font-semibold">Add Recipe</label>
          </div>
          <button className="text-lg font-semibold bg-orange-400 cursor-pointer text-white  rounded-3xl px-6 py-1 mx-3 ">
            Save
          </button>
        </div>
        <div className="flex-col items-center justify-center">
          <InputBox
            text="Title"
            placeholder="Give your Recipe a name"
            size="w-[600px]"
          />
          <TextAreaBox
            text="Description"
            placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..."
            size="w-[600px]"
          />
          <InputBox
            text="Ingredients"
            placeholder="Add one ingredient"
            size="w-[600px]"
          />
          <InputBox
            text="Instruction"
            placeholder="Add instruction"
            size="w-[600px]"
          />
          <InputBoxVariant
            text="Prep Time"
            placeholder="0"
            size="w-[600px]"
          />
          <InputBoxVariant
            text="Cook Time"
            placeholder="0"
            size="w-[600px]"
          />
          <Box/>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
