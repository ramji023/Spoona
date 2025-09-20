import { LeftArrowIcon } from "@repo/ui/icons/LeftArrowIcon";
import { InputBox, TextAreaBox } from "@repo/ui/components/InputBox";
import { InputBoxVariant, Box } from "./InputBoxVariant";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { PlusIcon } from "@repo/ui/icons/PlusIcon";
type RecipeForm = {
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  instruction: { steps: string }[];
  prepHours: string;
  prepMinutes: string;
  cookHours: string;
  cookMinutes: string;
  image?: string;
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
      ingredients: [{ name: "", quantity: "" }],
      instruction: [{ steps: "" }],
      prepHours: "",
      prepMinutes: "",
      cookHours: "",
      cookMinutes: "",
      image: "",
    },
  });

  // useFieldArray for dynamic ingredients
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  // useFieldArray for dynamic instructions
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instruction",
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
            {ingredientFields.map((field, index) => (
              <InputBoxVariant
                key={field.id}
                index={index}
                text={`Ingredient ${index + 1}`}
                size="w-[600px]"
                firstField={register(`ingredients.${index}.name`, {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                secondField={register(`ingredients.${index}.quantity`, {
                  required: "Quantity is required",
                  min: { value: 0, message: "Quantity cannot be negative" },
                })}
                firstError={errors.ingredients?.[index]?.name?.message}
                secondError={errors.ingredients?.[index]?.quantity?.message}
                firstLabel="Name"
                secondLabel="Quantity"
                firstPlaceholder="0"
                secondPlaceholder="0"
                onRemove={() => removeIngredient(index)}
              />
            ))}
            <div className="flex flex-row-reverse">
              <div className="w-[250px]">
                <div
                  className="w-8 h-8 rounded-full text-white bg-orange-400 flex justify-center items-center font-semibold cursor-pointer"
                  onClick={() => appendIngredient({ name: "", quantity: "" })}
                >
                  <PlusIcon />
                </div>
              </div>
            </div>
            {instructionFields.map((field, index) => (
              <InputBox
                index={index}
                text={`Instruction ${index + 1}`}
                boxSize="w-[600px]"
                placeholder="Add instruction"
                {...register(`instruction.${index}.steps`, {
                  required: "Instruction is Required",
                })}
                error={errors.instruction?.[index]?.steps?.message as string}
                onRemove={() => removeInstruction(index)}
              />
            ))}
            <div className="flex flex-row-reverse">
              <div className="w-[250px]">
                <div
                  className="w-8 h-8 rounded-full text-white bg-orange-400 flex justify-center items-center font-semibold cursor-pointer"
                  onClick={() => appendInstruction({ steps: "" })}
                >
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
            <Controller
              name="image"
              control={control}
              rules={{ required: "Image is required" }}
              render={({ field }) => (
                <Box
                  {...field} // gives value + onChange
                  error={errors.image?.message}
                />
              )}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
