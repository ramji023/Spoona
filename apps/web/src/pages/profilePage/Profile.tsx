import EmptyPage from "@repo/ui/components/EmptyPage";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../react_queries/queries";
import { ProfileIcon } from "@repo/ui/icons/profileIcon";
import { CrossIcon } from "@repo/ui/icons/CrossIcon";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../utils/axiosInstance";
import { useSuccessMsgStore } from "../../stores/successMsgStore";
import { Edit } from "lucide-react";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import Recipes from "../HomePage/Recipes";
import { useFailureMsgStore } from "../../stores/failureMsgStore";
import { UserProfileSkeleton } from "../../loaders/Loaders";
import { AxiosError } from "axios";
// import { useAuthStore } from "../../stores/authStore";
export default function Profile() {
  const navigate = useNavigate();
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);
  const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);
  // const token = useAuthStore((s)=>s.token)
  // const id = useAuthStore((s)=>s.id)
  const [err, setError] = useState("");
  const queryClient = useQueryClient();
  //write mutation for updating profile image
  const updateProfileImageMutation = useMutation({
    mutationFn: async (data: { profileImage: string }) => {
      const response = await api.post("/api/v1/user/avatar", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("after updating data : ", data);
      setSuccessMsg("waoo! You have updated your profile picture successfully");
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: (err: unknown) => {
      console.log("Something went wrong while updating profile image", err);
      if (err instanceof AxiosError) {
        if (err.response) {
          setError(
            err.response.data?.message || JSON.stringify(err.response.data)
          );
        } else if (err.request) {
          setError("No response from server. Please try again.");
        } else {
          setError(err.message || "An unexpected error occurred");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    },
  });

  // write mutation for updating profile data
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { username: string; bio: string }) => {
      const response = await api.post("/api/v1/user", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("after updating data : ", data);
      setIsModalOpen(false);
      setError("");
      setSuccessMsg("waoo! You have updated your profile successfully");
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: (err: unknown) => {
      console.log("Something went wrong while updating profile data", err);
      if (err instanceof AxiosError) {
        if (err.response) {
          setError(
            err.response.data?.message || JSON.stringify(err.response.data)
          );
        } else if (err.request) {
          setError("No response from server. Please try again.");
        } else {
          setError(err.message || "An unexpected error occurred");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // write logic to change profile image
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected file:", file);
      // TODO: upload file to backend here
      if (!file) return;
      const { url, err } = await uploadToCloudinary(file, "Spoona/avatar");
      if (url) {
        updateProfileImageMutation.mutate({ profileImage: url });
      } else {
        console.log(err);
      }
    }
  };
  const { data, isLoading, error } = useProfile();
  if (!data || error) {
    setFailureMsg("Sorry, Can't fetch your profile. Please try again");
    return <UserProfileSkeleton />;
  }

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  return (
    <>
      <div className="mx-30 p-10 my-10">
        {/* first section  */}
        <div className="flex justify-between items-center py-2 mb-10">
          <div className="flex gap-2 justify-center items-center">
            <div className="relative group">
              {data.profileImage ? (
                <>
                  <img
                    src={data.profileImage}
                    alt=""
                    className="w-30 h-30 rounded-full"
                  />
                </>
              ) : (
                <>
                  <div className="w-30 h-30 rounded-full flex items-center justify-center">
                    <ProfileIcon className="w-30 h-30" />
                  </div>
                </>
              )}
              {/* Overlay on hover */}
              <div
                className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-80 flex items-center justify-center transition-opacity cursor-pointer"
                onClick={handleIconClick}
              >
                <Edit className="w-7 h-7 text-orange-500" />
              </div>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold p-2">{data.username}</h1>
              {data.bio && (
                <p className="text-xs px-2 text-gray-600">{data.bio}</p>
              )}
              <div className="flex gap-4 items-center justify-center p-2 text-lg">
                <div className="font-semibold text-orange-400 text-xl">
                  0 <span className=" text-gray-400 text-lg">Following</span>
                </div>
                <div className="font-semibold text-orange-400 text-xl">
                  0 <span className=" text-gray-400 text-lg ">Followers</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="outline-1 outline-gray-400 px-4 py-2 rounded-3xl text-md hover:bg-orange-400 hover:text-white font-semibold cursor-pointer "
            >
              Edit Profile
            </button>
          </div>
          <ProfileUpdation
            open={isModalOpen}
            close={() => {
              setIsModalOpen(false);
              setError("");
            }}
            initialUsername={data.username}
            initialBio={data.bio}
            onSave={(data) => {
              console.log("Updated profile data:", data);
              updateProfileMutation.mutate(data);
            }}
            err={err}
          />
        </div>
        <div className="border-gray-300 border-t-2 py-5"></div>
        {/* second div  */}
        {data.recipes.length !== 0 ? (
          <div>
            <Recipes recipes={data.recipes} />
          </div>
        ) : (
          <div>
            <EmptyPage
              onClick={() => navigate("/add-recipe")}
              message="Keep track of recipes you made and share your food experience"
              button="Add Recipe"
            />
          </div>
        )}
      </div>
    </>
  );
}

interface PropType {
  open: boolean;
  close: () => void;
  initialUsername?: string;
  initialBio?: string;
  onSave?: (data: { username: string; bio: string }) => void;
  err: string;
}

function ProfileUpdation({
  open,
  close,
  initialUsername = "",
  initialBio = "",
  onSave,
  err,
}: PropType) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  if (!open) return null; // Don’t render if modal is closed

  const handleSave = () => {
    if (onSave) {
      if (usernameRef.current && bioRef.current) {
        onSave({
          username: usernameRef.current.value,
          bio: bioRef.current.value,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold">Update Profile</h2>
          <div
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={close}
          >
            <CrossIcon />
          </div>
        </div>

        <div className="min-h-[13px]">
          <span className="text-xs text-red-500 flex items-center justify-center">
            {err ?? ""}
          </span>
        </div>
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              ref={usernameRef}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
              defaultValue={initialUsername}
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              ref={bioRef}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
              rows={4}
              defaultValue={initialBio}
              placeholder="Write something about yourself..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
