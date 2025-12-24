import { LeftArrowIcon } from "@repo/ui/icons/LeftArrowIcon";
import { InputBox, TextAreaBox } from "@repo/ui/components/InputBox";
import { InputBoxVariant, Box } from "./InputBoxVariant";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { PlusIcon } from "@repo/ui/icons/PlusIcon";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axiosInstance";
import { DropDown } from "./DropDown";
import { useAllCommunities } from "../../react_queries/queries";
import { useAuthStore } from "../../stores/authStore";
import { useCallback, useEffect, useState } from "react";
import { RecipeForm } from "../../types/recipe";
import { useFailureMsgStore } from "../../stores/failureMsgStore";
import Err from "../../errors/ErrorBoundary";
import { diet,categories,cuisines } from "../../utils/recipe_filters";
import { AutocompleteInput } from "./AutoCompleteInput";
import { useSuccessMsgStore } from "../../stores/successMsgStore";
// write controller to add the recipe
const AddRecipe = () => {
  const navigate = useNavigate();
  // store the authenticated user id
  const id = useAuthStore((s) => s.id);

  // function to set the failure message
  const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);
  // function to set the success message
  const setSuccessMsg = useSuccessMsgStore((s)=>s.setSuccessMsg)
  console.log("Add recipe component re-rendered ");
  // state to store communities array
  const [communities, setCommuties] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  //mutation to send recipe data to server
  const recipeMutation = useMutation({
    mutationFn: async (data: RecipeForm) => {
      const response = await api.post("/api/v1/recipe", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Recipe added successfully", data);
      setSuccessMsg("Recipe has been created successfully")
      reset();
      navigate(-1);
    },
    onError: (err: Error | any) => {
      console.log("Error adding recipe", err);
      if (err.request) {
        setFailureMsg("Network error: Cannot connect to server");
      } else if (err.response) {
        setFailureMsg(err.response.data?.message || "Recipe Creation Failed");
      } else {
        setFailureMsg("Something went wrong.Try Again");
      }
    },
  });

  // mutation to send recipe data with-in a community
  const communityRecipeMutation = useMutation({
    mutationFn: async (data: RecipeForm) => {
      const response = await api.post(
        `/api/v1/community/${data.community}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Recipe added successfully", data);
      setSuccessMsg("Recipe has been uploaded on community successfully")
      reset();
      navigate(-1);
    },
    onError: (err: Error | any) => {
      console.log("Error adding recipe", err);
      if (err.request) {
        setFailureMsg("Network error: Cannot connect to server");
      } else if (err.response) {
        setFailureMsg(
          err.response.data?.message || "Community Recipe Creation Failed"
        );
      } else {
        setFailureMsg("Something went wrong.Try Again");
      }
    },
  });

  //initialize react hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RecipeForm>({
    defaultValues: {
      community: "everyone",
      title: "",
      description: "",
      ingredients: [{ name: "", quantity: "" }],
      instructions: [{ step: "" }],
      prepHours: "",
      prepMinutes: "",
      cookHours: "",
      cookMinutes: "",
      imageUrl: "",
      cuisines: "",
      categories: "",
      diets: "",
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
    name: "instructions",
  });

  // call onSubmit when user click to save button
  const onSubmit = (data: RecipeForm) => {
    console.log("Recipe Data:", data);
    // if user select everyone in community it means he want to upload recipe independently and if not then want to create community within community
    if (data.community !== "everyone") {
      communityRecipeMutation.mutate(data);
    } else {
      recipeMutation.mutate(data);
    }
  };

  // call react query to fetch all the  communities
  const { data, isLoading, error } = useAllCommunities();
  // then write function to filter out the communitiy where he is a community member
  const filteredCommunity = useCallback(() => {
    if (!data) return [];

    return data
      .filter((community) =>
        community.CommunityMembers.some((member) => member.user.id === id)
      )
      .map((community) => ({
        id: community.id,
        name: community.name,
      }));
  }, [data, id]);

  // write effect runs whenever filterCommunity update then update setCommunites also
  useEffect(() => {
    const communities = filteredCommunity();
    setCommuties(communities);
  }, [filteredCommunity]);

  // if community is loading
  if (isLoading) {
    return <>Community is loading</>;
  }
  if ( error) {
    console.log("communities fetching error" + error);
    // if there is an error then show error to user
    return <Err/>
    // alert("Something is messedup");
  }
  return (
    <>
      <div className="m-15 px-15 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 ">
              <div
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full cursor-pointer hover:bg-gray-100 flex justify-center items-center font-semibold"
              >
                <LeftArrowIcon />
              </div>
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
            <DropDown
              text="Community"
              boxSize="w-[600px]"
              communities={communities}
              {...register("community", {
                required: "Please select a community or choose Everyone",
              })}
              error={errors.community?.message}
            />

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
           {/* cuisines with AutocompleteInput */}
            <Controller
              name="cuisines"
              control={control}
              render={({ field }) => (
                <AutocompleteInput
                  text="Cuisines"
                  placeholder="Type to search cuisines..."
                  boxSize="w-[600px]"
                  options={cuisines}
                  {...field}
                  error={errors.cuisines?.message}
                />
              )}
            />
            {/* categories with AutocompleteInput */}
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <AutocompleteInput
                  text="Categories"
                  placeholder="Type to search categories..."
                  boxSize="w-[600px]"
                  options={categories}
                  {...field}
                  error={errors.categories?.message}
                />
              )}
            />

            {/* diet with AutocompleteInput */}
            <Controller
              name="diets"
              control={control}
              render={({ field }) => (
                <AutocompleteInput
                  text="Diets"
                  placeholder="Type to search Diets (Gluten-Free, Vegan, etc)..."
                  boxSize="w-[600px]"
                  options={diet}
                  {...field}
                  error={errors.diets?.message}
                />
              )}
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
                key={field.id}
                index={index}
                text={`Instruction ${index + 1}`}
                boxSize="w-[600px]"
                placeholder="Add instruction"
                {...register(`instructions.${index}.step`, {
                  required: "Instruction is Required",
                })}
                error={errors.instructions?.[index]?.step?.message as string}
                onRemove={() => removeInstruction(index)}
              />
            ))}
            <div className="flex flex-row-reverse">
              <div className="w-[250px]">
                <div
                  className="w-8 h-8 rounded-full text-white bg-orange-400 flex justify-center items-center font-semibold cursor-pointer"
                  onClick={() => appendInstruction({ step: "" })}
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
              name="imageUrl"
              control={control}
              rules={{ required: "Image is required" }}
              render={({ field }) => (
                <Box
                  {...field}
                  error={errors.imageUrl?.message}
                  folder="recipes"
                  boxSize="w-[600px] h-[200px]"
                  className="outline-gray-300"
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
