import { CrossIcon } from "@repo/ui/icons/CrossIcon";
import { Controller, useForm } from "react-hook-form";
import { Box } from "../recipePage/InputBoxVariant";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axiosInstance";
import { useSuccessMsgStore } from "../../stores/successMsgStore";
interface CommunityFormType {
  open: boolean;
  close: () => void;
}

interface FormStateType {
  name: string;
  description: string;
  coverImage: string;
}

export default function CommunityForm({ open, close }: CommunityFormType) {
  if (!open) return null;

  // success msg
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);

  const sendCommunityMutation = useMutation({
    mutationFn: async (data: FormStateType) => {
      const response = await api.post("/api/v1/community", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("response data : ", data);
      setSuccessMsg("hurrah! You have create community successfully");
    },
    onError: (err) => {
      console.log("Error to create communnity : ", err);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormStateType>({
    defaultValues: {
      name: "",
      description: "",
      coverImage: "",
    },
  });
  const onSubmit = (data: FormStateType) => {
    console.log(data);
    sendCommunityMutation.mutate(data);
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] z-50">
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="bg-gray-200 rounded-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto flex flex-col gap-5"
        >
          {/* first div  */}
          <div className="text-2xl font-semibold flex justify-between items-center">
            <h1>Your community</h1>
            <div
              onClick={() => close()}
              className="text-gray-700 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300"
            >
              <CrossIcon />
            </div>
          </div>

          {/* second div  */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col items-center justify-center"
          >
            {/* Title */}
            <div className="flex flex-col">
              <label className="font-medium">Title</label>
              <input
                type="text"
                placeholder="Write your community name"
                className="focus-within:outline-orange-400 outline-1 outline-gray-300 rounded p-2 w-[400px]"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters",
                  },
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="font-medium">Description</label>
              <textarea
                placeholder="What is this community all about ?"
                className="focus-within:outline-orange-400 outline-1 outline-gray-300  rounded p-2 w-[400px] h-[100px] resize-none"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 5,
                    message: "Description must be at least 5 characters",
                  },
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            <Controller
              name="coverImage"
              control={control}
              rules={{ required: "Cover Image is required" }}
              render={({ field }) => (
                <Box
                  {...field}
                  error={errors.coverImage?.message}
                  folder="community_cover_image"
                  label="Upload Community cover image"
                  boxSize="w-[400px] h-[100px]"
                />
              )}
            />

            <div className="flex justify-end gap-x-6 w-full">
              <button
                onClick={close}
                className="px-3 py-2 outline-1 rounded-3xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 rounded-3xl outline-orange-400 outline-1 text-white bg-orange-400 cursor-pointer"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
