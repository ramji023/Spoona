import { LeftArrowIcon } from "@repo/ui/icons/LeftArrowIcon";
import { Box, InputBox, TextAreaBox } from "@repo/ui/components/InputBox";
import { InputBoxVariant } from "./InputBoxVariant";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PlusIcon } from "@repo/ui/icons/PlusIcon";
import { CrossIcon } from "@repo/ui/icons/CrossIcon";
type RecipeForm = {
  title: string;
  description: string;
  ingredients: {
    name: string;
    quantity: string;
  };
  instruction: string;
  prepHours: string;
  prepMinutes: string;
  cookHours: string;
  cookMinutes: string;
};

const AddRecipe = () => {
  const navigate = useNavigate();

  //initialize react hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeForm>({
    defaultValues: {
      title: "",
      description: "",
      ingredients: {
        name: "",
        quantity: "",
      },
      instruction: "",
      prepHours: "",
      prepMinutes: "",
      cookHours: "",
      cookMinutes: "",
    },
  });

  const onSubmit = (data: RecipeForm) => {
    console.log("Recipe Data:", data);
  };

  return (
    <>
      <div className="m-15 px-15 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <div
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <LeftArrowIcon />
              <h1 className="text-2xl font-semibold">Add Recipe</h1>
            </div>
            <button
              type="submit"
              className="text-lg font-semibold bg-orange-400 cursor-pointer text-white  rounded-3xl px-6 py-2 mx-3 "
            >
              Save
            </button>
          </div>
          <div className="flex-col items-center justify-center">
            <InputBox
              text="Title"
              placeholder="Give your Recipe a name"
              boxSize="w-[600px]"
              {...register("title", {
                required: "Title is Required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
              error={errors.title?.message as string}
            />
            <TextAreaBox
              text="Description"
              placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc..."
              boxSize="w-[600px]"
              {...register("description", {
                required: "Description is Required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
              error={errors.description?.message as string}
            />
            <InputBoxVariant
              text="Ingredients"
              size="w-[600px]"
              firstField={register("ingredients.name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              secondField={register("ingredients.quantity", {
                required: "Quantity is required",
                min: { value: 0, message: "Quantity cannot be negative" },
              })}
              firstError={errors.ingredients?.name?.message}
              secondError={errors.ingredients?.quantity?.message}
              firstLabel="Name"
              secondLabel="Quantity"
              firstPlaceholder="0"
              secondPlaceholder="0"
            />
            <div className="flex flex-row-reverse">
              <div className="w-[250px]">
                <div className="w-8 h-8 rounded-full text-white bg-orange-400 flex justify-center items-center font-semibold cursor-pointer">
                  <PlusIcon />
                </div>
              </div>
            </div>
            <InputBox
              text="Instruction"
              placeholder="Add instruction"
              boxSize="w-[600px]"
              {...register("instruction", {
                required: "Ingredients is Required",
              })}
              error={errors.instruction?.message as string}
            />
            <div className="flex flex-row-reverse">
              <div className="w-[250px]">
                <div className="w-8 h-8 rounded-full text-white bg-orange-400 flex justify-center items-center font-semibold cursor-pointer">
                  <PlusIcon />
                </div>
              </div>
            </div>

            <InputBoxVariant
              text="Prep Time"
              size="w-[600px]"
              firstField={register("prepHours", {
                required: "Prep hours are required",
                min: { value: 0, message: "Hours cannot be negative" },
                max: { value: 23, message: "Hours must be less than 24" },
              })}
              secondField={register("prepMinutes", {
                required: "Prep minutes are required",
                min: { value: 0, message: "Minutes cannot be negative" },
                max: { value: 59, message: "Minutes must be less than 60" },
              })}
              firstError={errors.prepHours?.message}
              secondError={errors.prepMinutes?.message}
              firstLabel="Hours"
              secondLabel="Minutes"
              firstPlaceholder="0"
              secondPlaceholder="0"
            />

            <InputBoxVariant
              text="Cook Time"
              size="w-[600px]"
              firstField={register("cookHours", {
                required: "Cook hours are required",
                min: { value: 0, message: "Hours cannot be negative" },
                max: { value: 23, message: "Hours must be less than 24" },
              })}
              secondField={register("cookMinutes", {
                required: "Cook minutes are required",
                min: { value: 0, message: "Minutes cannot be negative" },
                max: { value: 59, message: "Minutes must be less than 60" },
              })}
              firstError={errors.cookHours?.message}
              secondError={errors.cookMinutes?.message}
              firstLabel="Hours"
              secondLabel="Minutes"
              firstPlaceholder="0"
              secondPlaceholder="0"
            />
            <Box />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
